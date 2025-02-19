import { SelectComp } from './Select'
import { extList } from '@/utils/extList'

export const SelectExt = ({
  onValueChange,
  value,
}: {
  onValueChange: (value: any) => {}
  value: string
}) => {
  return (
    <SelectComp
      defaultValue={extList[0].value}
      items={extList}
      placeholder="Selecione una extencion"
      itemsPlaceholder="Extenciones"
      onValueChange={(value) => onValueChange(value)}
      value={value}
    />
  )
}
