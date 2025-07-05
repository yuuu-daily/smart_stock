import { InputForm } from '../InputForm'
import type { Meta, StoryObj } from '@storybook/react'

export default {
    title: 'atoms/InputForm', // ← 自動生成された階層
    component: InputForm,
    render: (args) => <InputForm {...args} />,
} satisfies Meta<typeof InputForm>

export const Playground: StoryObj<typeof InputForm> = {
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
                <InputForm {...args} />
            </div>
        </div>
    ),
    args: {
        children: '新規追加',
    },
}


