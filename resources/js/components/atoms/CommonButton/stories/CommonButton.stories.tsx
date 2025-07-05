import { CommonButton } from '../CommonButton'
import type { Meta, StoryObj } from '@storybook/react'

export default {
    title: 'atoms/CommonButton', // ← 自動生成された階層
    component: CommonButton,
    render: (args) => <CommonButton {...args} />,
} satisfies Meta<typeof CommonButton>

export const Playground: StoryObj<typeof CommonButton> = {
    args: {
        children: 'Click me',
    },
}


