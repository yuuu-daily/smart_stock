import { CreateButton } from '../CreateButton'
import type { Meta, StoryObj } from '@storybook/react'

export default {
    title: 'atoms/CreateButton', // ← 自動生成された階層
    component: CreateButton,
    render: (args) => <CreateButton {...args} />,
} satisfies Meta<typeof CreateButton>

export const Playground: StoryObj<typeof CreateButton> = {
    render: (args) => (
        <div
            style={{
                position: 'relative',
                height: '120px',
                border: '1px dashed #ccc',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <CreateButton {...args} />
            </div>
        </div>
    ),
    args: {
        children: '新規追加',
    },
}


