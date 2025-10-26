import { useState, createContext, useContext, ReactNode, useEffect } from 'react';

type Language = 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ru: {
    // Header
    'dashboard': 'Панель управления',
    'device_control': 'Управление embedded устройством',
    'settings': 'Настройки',
    'logout': 'Выход',
    
    // Settings page
    'mqtt_settings': 'Настройки MQTT',
    'safety_settings': 'Безопасное состояние реле',
    'enable_mqtt': 'Включить MQTT',
    'hostname': 'Имя хоста',
    'port': 'Порт',
    'username': 'Логин пользователя',
    'password': 'Пароль',
    'enable_tls': 'Включить TLS',
    'enable_cert_validation': 'Валидация сертификата сервера',
    'enable_function': 'Включить функцию',
    'default_relay_states': 'Дефолтные состояния реле',
    'save_mqtt_settings': 'Сохранить MQTT настройки',
    'save_safety_settings': 'Сохранить настройки безопасности',
    'mqtt_settings_saved': 'MQTT настройки сохранены',
    'mqtt_settings_updated': 'Настройки подключения к MQTT серверу обновлены',
    'safety_settings_saved': 'Настройки безопасности сохранены',
    'safety_settings_updated': 'Безопасные состояния реле обновлены',
    'system_actions': 'Системные действия',
    'device_reboot': 'Перезагрузка устройства',
    'device_reboot_description': 'Выполнить полную перезагрузку embedded устройства',
    'reboot_device': 'Перезагрузить устройство',
    'confirm_reboot': 'Подтвердите перезагрузку',
    'reboot_confirmation_message': 'Вы уверены, что хотите перезагрузить устройство? Это может занять несколько минут.',
    'cancel': 'Отмена',
    'confirm': 'Подтвердить',
    'device_rebooting': 'Устройство перезагружается',
    'device_reboot_initiated': 'Команда перезагрузки отправлена на устройство',
    'overload_protection': 'Защита от перегрузки',
    'enable_overload_protection': 'Включить защиту от перегрузки',
    'power_threshold': 'Пороговое значение мощности',
    'power_threshold_placeholder': 'Введите значение в ваттах',
    'overload_action': 'Действие при перегрузке',
    'disconnect_all_relays': 'Отключить все реле',
    'disconnect_specific_relays': 'Отключить определенные реле',
    'relays_to_disconnect': 'Реле для отключения при перегрузке',
    'save_overload_settings': 'Сохранить настройки защиты',
    'overload_settings_saved': 'Настройки защиты сохранены',
    'overload_settings_updated': 'Параметры защиты от перегрузки обновлены',
    'power_threshold_required': 'Необходимо указать пороговое значение',
    'power_threshold_positive': 'Значение должно быть положительным',
    
    // Status
    'mqtt_connection': 'MQTT Соединение',
    'connected': 'Подключено',
    'disconnected': 'Отключено',
    'active_relays': 'Активные реле',
    'system_status': 'Состояние системы',
    'ready': 'Готова к работе',
    
    // Relay control
    'relay_control': 'Управление реле',
    'relay': 'Реле',
    'turned_on': 'включено',
    'turned_off': 'выключено',
    'command_sent': 'Команда отправлена на устройство',
    
    // Digital inputs
    'digital_inputs': 'Цифровые входы',
    'digital_input': 'Вход',
    'active': 'Активен',
    'inactive': 'Неактивен',
    
    // Energy monitoring
    'energy_monitoring': 'Энергомониторинг',
    'voltage': 'Напряжение сети',
    'current': 'Сила тока',
    'power_factor': 'Коэффициент мощности',
    'active_power': 'Активная мощность',
    'reactive_power': 'Реактивная мощность',
    'accumulated_energy': 'Накопленная энергия',
    'detailed_chart': 'Детальный график',
    
    // Device info
    'device_info': 'Информация об устройстве',
    'firmware_version': 'Версия прошивки',
    'uptime': 'Время работы',
    'ip_address': 'IP адрес',
    'mac_address': 'MAC адрес',
    
    // Units
    'volts': 'В',
    'amperes': 'А',
    'watts': 'Вт',
    'vars': 'ВАР',
    'kwh': 'кВт·ч',
    'of': 'из',
    'relays': 'реле',
    'days': 'д',
    'hours': 'ч',
    'minutes': 'м',
    
    // Login page
    'login_title': 'Авторизация',
    'login_subtitle': 'Вход в панель управления embedded устройством',
    'login_form_title': 'Данные для входа',
    'login_username': 'Логин',
    'login_username_placeholder': 'Введите логин',
    'login_password': 'Пароль',
    'login_password_placeholder': 'Введите пароль',
    'login_button': 'Войти в систему',
    'login_checking': 'Проверка...',
    'login_device_ready': 'Устройство готово к авторизации',
    'login_back_home': 'Вернуться на главную',
    'login_toast_title': 'Авторизация',
    'login_toast_description': 'Данные отправлены на устройство для проверки',
    'login_username_required': 'Логин обязателен',
    'login_username_max': 'Логин не может быть длиннее 50 символов',
    'login_password_min': 'Пароль должен содержать минимум 4 символа',
    'login_password_max': 'Пароль слишком длинный',
    
    // Logs page
    'device_logs': 'Логи устройства',
    'view_system_logs': 'Просмотр системных логов',
    'total_logs': 'Всего логов',
    'log_entries': 'Записи логов',
    'timestamp': 'Время',
    'level': 'Уровень',
    'source': 'Источник',
    'message': 'Сообщение',
    'info': 'Информация',
    'warnings': 'Предупреждения',
    'errors': 'Ошибки',
    'filters': 'Фильтры',
    'search_logs': 'Поиск в логах...',
    'all': 'Все',
    'export': 'Экспорт',
    'clear_logs': 'Очистить логи',
    'system_started': 'Система запущена',
    'mqtt_connected_broker': 'Подключено к MQTT брокеру',
    'relay_high_temperature': 'Высокая температура реле',
    'input_state_changed': 'Изменилось состояние входа',
    'voltage_out_of_range': 'Напряжение вне допустимого диапазона',
    'relay_turned_on': 'Реле включено',
    'relay_turned_off': 'Реле выключено',
    'high_memory_usage': 'Высокая загрузка памяти',
    'error': 'Ошибка',
    'warning': 'Предупреждение'
  },
  en: {
    // Header
    'dashboard': 'Dashboard',
    'device_control': 'Embedded device control',
    'settings': 'Settings',
    'logout': 'Logout',
    
    // Settings page
    'mqtt_settings': 'MQTT Settings',
    'safety_settings': 'Safety Relay States',
    'enable_mqtt': 'Enable MQTT',
    'hostname': 'Hostname',
    'port': 'Port',
    'username': 'Username',
    'password': 'Password',
    'enable_tls': 'Enable TLS',
    'enable_cert_validation': 'Server Certificate Validation',
    'enable_function': 'Enable Function',
    'default_relay_states': 'Default Relay States',
    'save_mqtt_settings': 'Save MQTT Settings',
    'save_safety_settings': 'Save Safety Settings',
    'mqtt_settings_saved': 'MQTT Settings Saved',
    'mqtt_settings_updated': 'MQTT server connection settings updated',
    'safety_settings_saved': 'Safety Settings Saved',
    'safety_settings_updated': 'Safe relay states updated',
    'system_actions': 'System Actions',
    'device_reboot': 'Device Reboot',
    'device_reboot_description': 'Perform a full reboot of the embedded device',
    'reboot_device': 'Reboot Device',
    'confirm_reboot': 'Confirm Reboot',
    'reboot_confirmation_message': 'Are you sure you want to reboot the device? This may take several minutes.',
    'cancel': 'Cancel',
    'confirm': 'Confirm',
    'device_rebooting': 'Device Rebooting',
    'device_reboot_initiated': 'Reboot command sent to device',
    'overload_protection': 'Overload Protection',
    'enable_overload_protection': 'Enable overload protection',
    'power_threshold': 'Power threshold',
    'power_threshold_placeholder': 'Enter value in watts',
    'overload_action': 'Action on overload',
    'disconnect_all_relays': 'Disconnect all relays',
    'disconnect_specific_relays': 'Disconnect specific relays',
    'relays_to_disconnect': 'Relays to disconnect on overload',
    'save_overload_settings': 'Save Protection Settings',
    'overload_settings_saved': 'Protection Settings Saved',
    'overload_settings_updated': 'Overload protection parameters updated',
    'power_threshold_required': 'Power threshold is required',
    'power_threshold_positive': 'Value must be positive',
    
    // Status
    'mqtt_connection': 'MQTT Connection',
    'connected': 'Connected',
    'disconnected': 'Disconnected',
    'active_relays': 'Active relays',
    'system_status': 'System status',
    'ready': 'Ready',
    
    // Relay control
    'relay_control': 'Relay Control',
    'relay': 'Relay',
    'turned_on': 'turned on',
    'turned_off': 'turned off',
    'command_sent': 'Command sent to device',
    
    // Digital inputs
    'digital_inputs': 'Digital Inputs',
    'digital_input': 'Input',
    'active': 'Active',
    'inactive': 'Inactive',
    
    // Energy monitoring
    'energy_monitoring': 'Energy Monitoring',
    'voltage': 'Network voltage',
    'current': 'Current',
    'power_factor': 'Power factor',
    'active_power': 'Active power',
    'reactive_power': 'Reactive power',
    'accumulated_energy': 'Accumulated energy',
    'detailed_chart': 'Detailed chart',
    
    // Device info
    'device_info': 'Device Information',
    'firmware_version': 'Firmware version',
    'uptime': 'Uptime',
    'ip_address': 'IP address',
    'mac_address': 'MAC address',
    
    // Units
    'volts': 'V',
    'amperes': 'A',
    'watts': 'W',
    'vars': 'VAR',
    'kwh': 'kWh',
    'of': 'of',
    'relays': 'relays',
    'days': 'd',
    'hours': 'h',
    'minutes': 'm',
    
    // Login page
    'login_title': 'Authorization',
    'login_subtitle': 'Login to embedded device control panel',
    'login_form_title': 'Login credentials',
    'login_username': 'Username',
    'login_username_placeholder': 'Enter username',
    'login_password': 'Password',
    'login_password_placeholder': 'Enter password',
    'login_button': 'Log in',
    'login_checking': 'Checking...',
    'login_device_ready': 'Device ready for authorization',
    'login_back_home': 'Back to home',
    'login_toast_title': 'Authorization',
    'login_toast_description': 'Credentials sent to device for verification',
    'login_username_required': 'Username is required',
    'login_username_max': 'Username cannot be longer than 50 characters',
    'login_password_min': 'Password must contain at least 4 characters',
    'login_password_max': 'Password is too long',
    
    // Logs page
    'device_logs': 'Device Logs',
    'view_system_logs': 'View system logs',
    'total_logs': 'Total Logs',
    'log_entries': 'Log Entries',
    'timestamp': 'Timestamp',
    'level': 'Level',
    'source': 'Source',
    'message': 'Message',
    'info': 'Info',
    'warnings': 'Warnings',
    'errors': 'Errors',
    'filters': 'Filters',
    'search_logs': 'Search logs...',
    'all': 'All',
    'export': 'Export',
    'clear_logs': 'Clear Logs',
    'system_started': 'System started',
    'mqtt_connected_broker': 'Connected to MQTT broker',
    'relay_high_temperature': 'Relay high temperature',
    'input_state_changed': 'Input state changed',
    'voltage_out_of_range': 'Voltage out of range',
    'relay_turned_on': 'Relay turned on',
    'relay_turned_off': 'Relay turned off',
    'high_memory_usage': 'High memory usage',
    'error': 'Error',
    'warning': 'Warning'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'ru';
  });
  
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);
  
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ru']] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};