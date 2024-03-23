import { render } from "@testing-library/react";
import ProfilePicture from "./ProfilePicture";

describe('ProfilePicture Tests', () => {

    test('Properly renders ProfilePicture', () => {
        const imageUrl = "https://test-image-bucket-rev.s3.us-west-1.amazonaws.com/default.webp";
        const { getByRole } = render(<ProfilePicture imageUrl={imageUrl} />);

        const img = getByRole('img');

        expect(img).toBeInTheDocument();
    })
})
