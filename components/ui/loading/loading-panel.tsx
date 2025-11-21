import { LoadingSection } from './loading-section';

export const LoadingPanel = () => (
    <div className="w-sm relative bg-muted border-r">
        <LoadingSection className="h-full w-full absolute top-0 left-0" />
    </div>
);
