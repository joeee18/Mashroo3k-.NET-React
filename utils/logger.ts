// Frontend Logger Utility
// Provides colored console logging for better debugging

enum LogLevel {
    DEBUG = 'DEBUG',
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS'
}

class Logger {
    private isDevelopment = (import.meta as any).env?.DEV ?? false;
    private enabledLevels: Set<LogLevel>;

    constructor() {
        // Enable all levels in development, only WARN and ERROR in production
        this.enabledLevels = this.isDevelopment
            ? new Set([LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR, LogLevel.SUCCESS])
            : new Set([LogLevel.WARN, LogLevel.ERROR]);
    }

    private formatMessage(level: LogLevel, message: string, ...args: any[]): void {
        if (!this.enabledLevels.has(level)) return;

        const timestamp = new Date().toLocaleTimeString();
        const styles = this.getStyles(level);
        
        console.log(
            `%c[${timestamp}] %c${level}%c ${message}`,
            'color: #666',
            styles,
            'color: inherit',
            ...args
        );
    }

    private getStyles(level: LogLevel): string {
        switch (level) {
            case LogLevel.DEBUG:
                return 'color: #9CA3AF; font-weight: bold';
            case LogLevel.INFO:
                return 'color: #3B82F6; font-weight: bold';
            case LogLevel.WARN:
                return 'color: #F59E0B; font-weight: bold';
            case LogLevel.ERROR:
                return 'color: #EF4444; font-weight: bold';
            case LogLevel.SUCCESS:
                return 'color: #10B981; font-weight: bold';
            default:
                return 'font-weight: bold';
        }
    }

    debug(message: string, ...args: any[]): void {
        this.formatMessage(LogLevel.DEBUG, message, ...args);
    }

    info(message: string, ...args: any[]): void {
        this.formatMessage(LogLevel.INFO, message, ...args);
    }

    warn(message: string, ...args: any[]): void {
        this.formatMessage(LogLevel.WARN, message, ...args);
    }

    error(message: string, ...args: any[]): void {
        this.formatMessage(LogLevel.ERROR, message, ...args);
        if (args.length > 0 && args[0] instanceof Error) {
            console.error(args[0]);
        }
    }

    success(message: string, ...args: any[]): void {
        this.formatMessage(LogLevel.SUCCESS, message, ...args);
    }

    group(label: string): void {
        if (this.isDevelopment) {
            console.group(`%c${label}`, 'color: #8B5CF6; font-weight: bold');
        }
    }

    groupEnd(): void {
        if (this.isDevelopment) {
            console.groupEnd();
        }
    }

    table(data: any): void {
        if (this.isDevelopment) {
            console.table(data);
        }
    }
}

export const logger = new Logger();
export default logger;
