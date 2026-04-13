export class AlertNotifications {
    constructor({ historyElement = null, dialogElement = null, toastContainer = null } = {}) {
        this.historyElement = historyElement;
        this.dialogElement = dialogElement;
        this.toastContainer = toastContainer;
        this.alerts = [];
        this.permissionGranted = false;
        this.browserNotificationsEnabled = this.loadBrowserNotificationPreference();
    }

    loadBrowserNotificationPreference() {
        try {
            const saved = localStorage.getItem("browserNotificationsEnabled");
            if (saved === null) {
                return true;
            }

            return saved === "true";
        } catch {
            return true;
        }
    }

    setBrowserNotificationsEnabled(enabled) {
        this.browserNotificationsEnabled = enabled;
        try {
            localStorage.setItem("browserNotificationsEnabled", String(enabled));
        } catch {
            // Ignore localStorage failures in private mode or restricted environments.
        }
    }

    async init() {
        this.setBrowserNotificationsEnabled(true);

        if (!("Notification" in window)) {
            return false;
        }

        if (Notification.permission === "granted") {
            this.permissionGranted = true;
            return true;
        }

        if (Notification.permission === "denied") {
            this.permissionGranted = false;
            return false;
        }

        const permission = await Notification.requestPermission();
        this.permissionGranted = permission === "granted";
        return this.permissionGranted;
    }

    disableBrowserNotifications() {
        this.setBrowserNotificationsEnabled(false);
        this.permissionGranted = false;
    }

    getAlertLevel(value) {
        if (value < 0) {
            return "cold";
        }

        if (value > 35) {
            return "hot";
        }

        return "normal";
    }

    getAlertMessage(value, label = "temperature") {
        if (value < 0) {
            return `${label} trop basse: ${value}°C`;
        }

        if (value > 35) {
            return `${label} trop elevee: ${value}°C`;
        }

        return `${label} dans la plage normale: ${value}°C`;
    }

    addAlert({ value, label = "temperature", source = "capteur", timestamp = new Date() }) {
        const alert = {
            value,
            label,
            source,
            level: this.getAlertLevel(value),
            message: this.getAlertMessage(value, label),
            timestamp,
        };

        this.alerts.unshift(alert);
        this.renderHistory();
        this.pushNotification(alert);
        this.showToast(alert);

        return alert;
    }

    pushNotification(alert) {
        if (!this.browserNotificationsEnabled || !this.permissionGranted || !("Notification" in window)) {
            return;
        }

        new Notification("Alerte temperature", {
            body: alert.message,
        });
    }

    getToastContainer() {
        if (this.toastContainer) {
            return this.toastContainer;
        }

        const existingContainer = document.getElementById("toastContainer");
        if (existingContainer) {
            this.toastContainer = existingContainer;
            return this.toastContainer;
        }

        const container = document.createElement("div");
        container.id = "toastContainer";
        container.setAttribute("aria-live", "polite");
        container.setAttribute("aria-atomic", "true");
        document.body.appendChild(container);
        this.toastContainer = container;
        return this.toastContainer;
    }

    showToast(alert) {
        const container = this.getToastContainer();
        if (!container) {
            return;
        }

        const toast = document.createElement("div");
        toast.className = `toast alert-${alert.level}`;
        toast.textContent = alert.message;
        container.appendChild(toast);

        window.setTimeout(() => {
            toast.classList.add("toast-exit");
            window.setTimeout(() => {
                toast.remove();
            }, 250);
        }, 3500);
    }

    renderHistory() {
        if (!this.historyElement) {
            return;
        }

        if (this.alerts.length === 0) {
            this.historyElement.textContent = "Aucune alerte pour le moment.";
            return;
        }

        this.historyElement.innerHTML = this.alerts
            .map((alert) => {
                const date = new Intl.DateTimeFormat("fr-FR", {
                    dateStyle: "short",
                    timeStyle: "short",
                }).format(alert.timestamp);

                return `<li class="alert-item alert-${alert.level}"><strong>${date}</strong> - ${alert.message}</li>`;
            })
            .join("");
    }

    openDialog() {
        if (!this.dialogElement) {
            return;
        }

        this.dialogElement.hidden = false;
        if (typeof this.dialogElement.showModal === "function" && !this.dialogElement.open) {
            this.dialogElement.showModal();
        }
        this.dialogElement.setAttribute("aria-hidden", "false");
    }

    closeDialog() {
        if (!this.dialogElement) {
            return;
        }

        if (typeof this.dialogElement.close === "function" && this.dialogElement.open) {
            this.dialogElement.close();
        }
        this.dialogElement.hidden = true;
        this.dialogElement.setAttribute("aria-hidden", "true");
    }

    bindDialogControls({ openButton = null, closeButton = null } = {}) {
        if (openButton) {
            openButton.addEventListener("click", () => this.openDialog());
        }

        if (closeButton) {
            closeButton.addEventListener("click", () => this.closeDialog());
        }
    }
}

export class AlertNotification extends AlertNotifications {}