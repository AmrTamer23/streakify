import { Meta, StoryObj } from "@storybook/vue3";
import NavBar from "./NavBar.vue";
const meta = {
  title: "NavBar",
  component: NavBar,
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof NavBar>;

export const NotAuthenticated: Story = {
  render: () => ({
    template: "<NavBar />",
  }),
};
