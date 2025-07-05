import { CustomModal } from '../Modal'
import type { Meta, StoryObj } from '@storybook/react'

export default {
    title: 'atoms/CustomModal', // ← 自動生成された階層
    component: CustomModal,
    render: (args) => <CustomModal {...args} />,
} satisfies Meta<typeof CustomModal>

export const Playground: StoryObj<typeof CustomModal> = {
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
                <CustomModal {...args} />
            </div>
        </div>
    ),
    args: {
    },
}


