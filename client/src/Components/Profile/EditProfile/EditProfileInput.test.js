import { render } from "@testing-library/react";
import EditProfileInput from "./EditProfileInput";

describe('EditProfileInput Tests', () => {

    test('properly renders input fields', () => {
        const aboutMe = 'About me...'
        const setShowEditProfile = jest.fn();
        const updateProfile = jest.fn();
        const { getByLabelText, getByText } = render(<EditProfileInput aboutMe={aboutMe} setShowEditProfile={setShowEditProfile} updateProfile={updateProfile} />)

        const textArea = getByLabelText('About Me');
        const submitButton = getByText('Submit');

        expect(textArea).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    })
})
