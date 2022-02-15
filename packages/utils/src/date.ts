import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/ru';

export type SubsocialDateLocaleProps = {
  localeName: string;
  relativeTime: RelativeTimeProps
};

export type RelativeTimeProps = {
    future: string;
    past: string;
    s: string;
    m: string;
    mm: string;
    h: string;
    hh: string;
    d: string;
    dd: string;
    M: string;
    MM: string;
    y: string;
    yy: string;
}

class SubsocialDate {
    constructor() {
        dayjs.extend(relativeTime);
        dayjs.extend(updateLocale);
    }
    
    formatDate(date: string | number) {
        const diff = dayjs().diff(dayjs(date), 'days');
        
        if (diff < 7) {
            return dayjs(date).fromNow().toLowerCase();
        } else if (diff > 7 && diff < 365) {
            return dayjs(date).format('DD MMM');
        } else {
            return dayjs(date).format('DD MMM YY');
        }
    }
    
    updateLocale({ localeName, relativeTime }: SubsocialDateLocaleProps) {
        dayjs.updateLocale(localeName, { relativeTime });
        this.setLocale(localeName);
    }
    
    setLocale(localeName: string) {
        dayjs.locale(localeName);
    }
}

export const relativeTimeUnits: RelativeTimeProps = {
  future: '%s',
  past: '%s',
  s: '',
  m: '',
  mm: '%d',
  h: '',
  hh: '%d',
  d: '',
  dd: '%d',
  M: '',
  MM: '%d',
  y: '',
  yy: '%d',
};

export const I18N_DAYJS_RELATIVE_TIME_KEY = 'dayjs.relativeTime';

export const SubDate = new SubsocialDate();