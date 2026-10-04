import { useState } from 'react'
import { ConfigProvider, DatePicker, Select } from 'antd'
import dayjs, { type Dayjs } from 'dayjs'
import { Download, Loader2, Check } from 'lucide-react'
import { reportTypes } from '../../../mock/reports'

const { RangePicker } = DatePicker

type Status = 'idle' | 'downloading' | 'done'

export default function ReportDownload() {
  const [reportId, setReportId] = useState(reportTypes[0].id)
  const [range, setRange] = useState<[Dayjs, Dayjs] | null>(null)
  const [status, setStatus] = useState<Status>('idle')

  const handleDownload = () => {
    if (status !== 'idle') return
    setStatus('downloading')
    // Simulate preparing the file, then show a success tick for 3s.
    setTimeout(() => {
      setStatus('done')
      setTimeout(() => setStatus('idle'), 3000)
    }, 1500)
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#2563eb',
          borderRadius: 10,
          controlHeight: 40,
          fontFamily: 'inherit',
        },
      }}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Select
          value={reportId}
          onChange={setReportId}
          options={reportTypes.map((r) => ({ value: r.id, label: r.label }))}
          className="w-full sm:w-44"
        />

        <RangePicker
          value={range}
          onChange={(v) => setRange(v as [Dayjs, Dayjs] | null)}
          format="DD MMM YYYY"
          // Block any date after today so a future end date can't be chosen
          disabledDate={(current) => current && current > dayjs().endOf('day')}
          className="w-full sm:w-60"
        />

        <button
          onClick={handleDownload}
          disabled={status !== 'idle'}
          className={`flex h-10 shrink-0 items-center justify-center gap-2 rounded-[10px] px-5 text-sm font-semibold text-white transition-colors ${
            status === 'done'
              ? 'bg-emerald-500'
              : 'bg-blue-600 hover:bg-blue-700 disabled:opacity-80'
          } ${status === 'idle' ? 'cursor-pointer' : 'cursor-default'}`}
        >
          {status === 'downloading' && (
            <>
              <Loader2 size={16} className="animate-spin" />
              Downloading
            </>
          )}
          {status === 'done' && (
            <>
              <Check size={16} />
              Done
            </>
          )}
          {status === 'idle' && (
            <>
              <Download size={16} />
              Download Report
            </>
          )}
        </button>
      </div>
    </ConfigProvider>
  )
}
