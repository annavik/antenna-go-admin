import { Button } from '@/components/ui/button';
import { LABELS } from '@/lib/taxa/constants';
import { Fragment, useEffect, useState } from 'react';
import { Checkbox } from '../ui/checkbox';
import { LoadingSection } from '../ui/loading/loading-section';

export const ConfirmForm = ({
    fields,
    isLoading,
    onBack,
    onConfirm
}: {
    fields: { [key: string]: string };
    isLoading?: boolean;
    onBack: () => void;
    onConfirm: (fields: { [key: string]: string }) => void;
}) => {
    const [checked, setChecked] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        // Set all fields as selected from start
        if (fields) {
            setChecked(Object.fromEntries(Object.keys(fields).map((key) => [key, true])));
        }
    }, [fields]);

    return (
        <>
            {isLoading ? (
                <LoadingSection />
            ) : fields ? (
                <div className="grid gap-4 py-4" style={{ gridTemplateColumns: 'auto auto 1fr' }}>
                    {Object.entries(fields).map(([key, value]) => (
                        <Fragment key={key}>
                            <div className="flex h-5 items-center">
                                <Checkbox
                                    checked={checked[key] ?? false}
                                    id={key}
                                    onCheckedChange={() => setChecked((prev) => ({ ...prev, [key]: !checked[key] }))}
                                />
                            </div>
                            <label className="pt-0.5 body-small font-medium whitespace-nowrap" htmlFor={key}>
                                {LABELS[key]}
                            </label>
                            {key === 'cover_image_url' ? (
                                <img alt="" className="h-32 bg-muted rounded-md border" src={value} />
                            ) : key === 'cover_image_thumbnail_url' ? (
                                <img alt="" className="h-16 w-16 object-cover bg-muted rounded-md border" src={value} />
                            ) : (
                                <span className="pt-0.5 body-small text-muted-foreground">{value}</span>
                            )}
                        </Fragment>
                    ))}
                </div>
            ) : null}
            <div className="flex items-center justify-end gap-4">
                <Button onClick={() => onBack()} variant="ghost">
                    <span className="pt-0.5">Back</span>
                </Button>
                <Button
                    disabled={!fields}
                    onClick={() => {
                        const checkedFields = Object.fromEntries(
                            Object.entries(fields).filter(([key]) => checked[key])
                        );
                        onConfirm(checkedFields);
                    }}
                    variant="success"
                >
                    <span className="pt-0.5">Confirm</span>
                </Button>
            </div>
        </>
    );
};
