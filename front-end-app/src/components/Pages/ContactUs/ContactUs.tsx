import './ContactUs.css';

const ContactUs = () => {
    return (
        <div className={'contactus-container'}>
            <div className={'card'}>
                <h1>Contact Us</h1>
                <p>
                    If you have any questions or feedback, please feel free to contact us at <a
                    href="mailto:johndoe@example.com">johndoe@example.com</a>.
                </p>
            </div>
        </div>
    );
}

export default ContactUs;