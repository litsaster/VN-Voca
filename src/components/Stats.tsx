interface Props {
  learned: number
  total: number
  totalLearned: number
}

export default function Stats({ learned, total, totalLearned }: Props) {
  return (
    <div className="flex justify-between items-center flex-wrap gap-2 mb-5 text-xs text-[#8e7d68]">
      <span className="bg-[#e7dfd5] rounded-full px-3 py-1">
        📊 Đã học: {learned}/{total} từ
      </span>
      <span className="bg-[#e7dfd5] rounded-full px-3 py-1">
        ⭐ Tổng số từ đã nhớ: {totalLearned}
      </span>
    </div>
  )
}
