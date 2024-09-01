import type { Meta, StoryObj } from "@storybook/react";
import Card from "@/components/commons/Card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  argTypes: {
    status: {
      control: "select",
      options: ["approve", "reject", "judge"],
    },
    isAdmin: {
      control: "boolean",
    },
    likes: {
      control: "object",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    id: 1,
    name: "Example Name",
    address: "1234 Example St.",
    status: "judge",
    isAdmin: false,
    likes: {
      mylike: false,
      count: 10,
    },
    createdAt: "2023-09-01",
  },
};

export const Admin: Story = {
  args: {
    ...Default.args,
    isAdmin: true,
    status: "approve",
  },
};
