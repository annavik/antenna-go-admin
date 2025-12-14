import { FormField } from '@/components/forms/form-field';
import { Input } from '@/components/ui/input';
import Form from 'next/form';
import { login } from './actions';
import LoginButton from './login-button';

export default function Page() {
    return (
        <div className="grow flex items-center justify-center">
            <Form action={login} className="w-sm flex flex-col gap-8 p-8 bg-background border rounded-lg">
                <h1 className="heading-small text-primary">Login</h1>
                <FormField label="Email">
                    <Input id="email" name="email" placeholder="Your email" required type="email" />
                </FormField>
                <FormField label="Password">
                    <Input id="password" name="password" placeholder="Your password" required type="password" />
                </FormField>
                <LoginButton />
            </Form>
        </div>
    );
}
