import { CenterBox } from '../components/common/CenterBox';
import { useForm, SubmitHandler } from 'react-hook-form';
import { authService } from '../services/auth/auth.service';
import { useNavigate } from 'react-router-dom';
import ErrorMessageBox from '../components/common/ErrorMessageBox';
import { useState } from 'react';

type LoginInput = {
    username: string;
    password: string;
};

type ErrorMessageType = {
    hide: boolean;
    message: string;
};

function Login() {
    const navigate = useNavigate();

    const [error, setError] = useState<ErrorMessageType>({
        hide: true,
        message: '',
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>();

    const onSubmit: SubmitHandler<LoginInput> = async ({
        username,
        password,
    }) => {
        /* ------------------ check username and pasword for signin ----------------- */
        const authenticated: boolean = await authService.signin(
            username,
            password
        );

        if (authenticated) {
            navigate('/?page=1&limit=10', { replace: true });
        } else {
            setError({
                hide: false,
                message: 'invalid username or password',
            });
        }
    };

    return (
        <CenterBox>
            <div className="box" style={{ width: 350 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="is-size-5 has-text-centered has-text-primary has-text-weight-bold mb-4">
                        Signin to COVID 19 Portal
                    </h1>
                    <div className="field">
                        <label className="label">Username</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                placeholder="e.g. test-user"
                                {...register('username', {
                                    required: {
                                        value: true,
                                        message: 'field is required',
                                    },
                                })}
                            />
                        </div>
                        {errors.username && (
                            <p className="help is-danger">
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input
                                className="input"
                                type="password"
                                placeholder="********"
                                {...register('password', {
                                    required: {
                                        value: true,
                                        message: 'field is required',
                                    },
                                })}
                            />
                        </div>
                        {errors.password && (
                            <p className="help is-danger">
                                {errors.password?.message}
                            </p>
                        )}
                    </div>

                    <button className="button is-primary" type="submit">
                        Sign in
                    </button>
                </form>
                <ErrorMessageBox
                    hidden={error.hide}
                    message={error.message}
                    onHideMessage={() => setError({ hide: true, message: '' })}
                />
            </div>
        </CenterBox>
    );
}

export default Login;
