import type { Meta, StoryObj } from '@storybook/react-vite';
import { MyLabel } from "../components/MyLabel";

const meta = {
    title: 'Example/MyLabel',
    component: MyLabel,
} satisfies Meta<typeof MyLabel>;



export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};