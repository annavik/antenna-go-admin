import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md body-base font-medium transition-all hover:opacity-70 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground',
                destructive: 'bg-destructive text-destructive-foreground',
                ghost: undefined,
                outline: 'bg-background border',
                secondary: 'bg-secondary text-secondary-foreground',
                success: 'bg-success text-success-foreground'
            },
            size: {
                default: 'h-9 px-4 py-2',
                sm: 'h-8 rounded-md gap-1.5 px-3',
                lg: 'h-10 rounded-md px-6',
                icon: 'size-8'
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default'
        }
    }
);

function Button({
    asChild = false,
    className,
    size,
    type = 'button',
    variant,
    ...props
}: React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    }) {
    const Comp = asChild ? Slot : 'button';

    return (
        <Comp className={cn(buttonVariants({ variant, size, className }))} data-slot="button" type={type} {...props} />
    );
}

export { Button, buttonVariants };
