type Props = {
    message: string;
    hidden: boolean;
    onHideMessage: () => void;
};

function ErrorMessageBox({ message, hidden = true, onHideMessage }: Props) {
    return (
        <div className="my-3" hidden={hidden}>
            <div>
                <article className="message is-danger">
                    <div className="message-body" style={{ fontSize: 12 }}>
                        <>
                            <button
                                className="delete mr-2"
                                aria-label="delete"
                                onClick={onHideMessage}
                            ></button>
                            {message}
                        </>
                    </div>
                </article>
            </div>
        </div>
    );
}

export default ErrorMessageBox;
