import { FormField } from '@/components/forms/form-field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { login } from './actions';

export default function Page() {
    return (
        <div className="grow flex items-center justify-center">
            <form className="w-sm flex flex-col gap-8 p-8 bg-background border rounded-lg">
                <h1 className="heading-small text-primary">Login</h1>
                <FormField label="Email">
                    <Input id="email" name="email" placeholder="Your email" required type="email" />
                </FormField>
                <FormField label="Password">
                    <Input id="password" name="password" placeholder="Your password" required type="password" />
                </FormField>
                <Button formAction={login} type="submit" variant="success">
                    <span className="pt-0.5">Login</span>
                </Button>
            </form>
        </div>
    );
}
