import toast from 'react-hot-toast';

export const errorToast = (message: string) => {
    toast.error(message, {
        style: {
            border: '1px solid hsl(348, 100%, 61%)',
            padding: '16px',
            color: 'hsl(348, 100%, 61%)',
        },
        iconTheme: {
            primary: 'hsl(348, 100%, 61%)',
            secondary: '#FFFAEE',
        },
    });
};

export const successToast = (message: string) => {
    toast.success(message, {
        style: {
            border: '1px solid hsl(141, 71%, 48%)',
            padding: '16px',
            color: 'hsl(141, 71%, 48%)',
        },
        iconTheme: {
            primary: 'hsl(141, 71%, 48%)',
            secondary: '#FFFAEE',
        },
    });
};
