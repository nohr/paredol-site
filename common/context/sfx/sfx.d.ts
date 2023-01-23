
interface SFXContextProps {
    select: () => void;
    open: () => void;
    close: () => void;
    home: () => void;
    confirm: () => void;
    reset: () => void;
    audio: React.RefObject<HTMLAudioElement> | null;
}
