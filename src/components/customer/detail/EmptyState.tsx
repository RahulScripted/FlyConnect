import { Empty } from 'antd'

export default function CustomerEmptyState() {
  return (
    <div className="flex h-[560px] items-center justify-center rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <Empty
        description="No data available"
        image={Empty.PRESENTED_IMAGE_DEFAULT}
        className="!mt-10 !flex-col !items-center !justify-center"
      />
    </div>
  )
}
