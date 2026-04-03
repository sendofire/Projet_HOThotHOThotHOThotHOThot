# Use https for this project

## Preface
This is for the moment only for linux system, you can create the certificate in windows but the configuration of the server is only for linux system.

## Creation of the Certificate
 
 First you need to install the package `mkcert` :
 ```bash
 brew install mkcert        # macOS
 choco install mkcert       # Windows
 sudo apt install mkcert    # Ubuntu
 sudo pacman -S mkcert      # ArchLinux
 ```
 
Then do the command :
```bash
# Make a certificate for localhost
mkcert localhost
```

This is the command to create a certificate with `openssl` :
```bash
 openssl req -x509 -out localhost.crt -keyout localhost.key -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' -extensions EXT -config <(printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
 ```

## Configuration of the server (Apache)
### On Archlinux

Move the certificate made by `mkcert` in a directory,
for exemple the folder `/etc/httpd/ssl/mkcert/`.
```bash
# The certificate all start by "localhost" so i used the grouping pattern "*" for an easier displacement.
# You need to create the directory.
sudo mv localhost* /etc/httpd/ssl/mkcert/
```
>NOTE : This may not be needed

Go to the directory where the certificate is and do this :
```bash
sudo chmod 640 localhost-key.pem
sudo chown root:http localhost-key.pem
```

In `/etc/httpd/conf/httpd.conf`, uncomment the following three lines:
```apacheconf
LoadModule ssl_module modules/mod_ssl.so
LoadModule socache_shmcb_module modules/mod_socache_shmcb.so
Include conf/extra/httpd-ssl.conf

# Near the bottom, also uncomment:
Include conf/extra/httpd-ssl.conf
Include conf/extra/httpd-vhosts.conf

# For PHP, make sure this is present (add if missing):
LoadModule php_module modules/libphp.so
AddHandler php-script .php
Include conf/extra/php_module.conf
```
In the file `/etc/httpd/conf/extra/httpd-vhosts.conf`, add at the end this :
```apacheconf
# HTTP → HTTPS redirect
<VirtualHost *:80>
    ServerName localhost
    Redirect permanent / https://localhost/
</VirtualHost>

# HTTPS Virtual Host
<VirtualHost *:443>
    ServerName localhost
    # replace it with the path of the project root
    DocumentRoot "/srv/http/myapp"

    SSLEngine on
    # verify if the path is the one of the certificate
    SSLCertificateFile    /etc/httpd/ssl/mkcert/localhost.pem
    SSLCertificateKeyFile /etc/httpd/ssl/mkcert/localhost-key.pem

    <Directory "/srv/http/myapp">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog  /var/log/httpd/myapp-ssl-error.log
    CustomLog /var/log/httpd/myapp-ssl-access.log combined
</VirtualHost>
```
> NOTE :
> I recommend to set the path of the project in `/srv/http/` because apache may not have the autorisation to read the file in your user directory. 

```bash
sudo apachectl configtest    # Should say: Syntax OK
sudo systemctl enable --now httpd
# Or if already running:
sudo systemctl restart httpd
```

### On Ubuntu (WIP)
Install `apache`:
```bash
sudo apt-get install apache
```
Activate the service `httpd`:
```bash
# Check httpd status
systemctl status httpd
# Start the service if necessary
systemctl start httpd
```

Move the certificate made by `mkcert` in a directory,
for exemple the folder `/etc/ssl/mkcert/`.
```bash
# The certificate all start by "localhost" so i used the grouping pattern "*" for an easier displacement.
# You need to create the directory.
sudo mv localhost* /etc/ssl/mkcert/
```
Create a config file :
```bash
# If the directory are not present make them with "sudo mkdir [dir_name]"
sudo nano /etc/apache2/sites-available/project_hotHot.conf
```
Paste this config parameter :
```apacheconf
<VirtualHost *:443>
    ServerName localhost

    # Your PHP app's root directory
    DocumentRoot /absolute/path/to/the/root/of/the/web/app

    # SSL Configuration
    SSLEngine on
    SSLCertificateFile    /etc/ssl/mkcert/localhost.pem
    SSLCertificateKeyFile /etc/ssl/mkcert/localhost-key.pem

    <Directory /var/www/myapp>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog  ${APACHE_LOG_DIR}/myapp-ssl-error.log
    CustomLog ${APACHE_LOG_DIR}/myapp-ssl-access.log combined
</VirtualHost>

# Optional: redirect HTTP → HTTPS
<VirtualHost *:80>
    ServerName localhost
    Redirect permanent / https://localhost/
</VirtualHost>
```
