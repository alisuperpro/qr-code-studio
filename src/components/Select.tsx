import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function SelectComp({
  onValueChange,
  defaultValue,
  placeholder,
  items,
  itemsPlaceholder,
  value,
  required,
}: {
  onValueChange: (value: any) => {}
  defaultValue: string
  placeholder: string
  items: LabelValue[]
  itemsPlaceholder: string
  value: string
  required: boolean
}) {
  return (
    <Select
      onValueChange={onValueChange}
      defaultValue={defaultValue}
      value={value}
      required={required}
    >
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{itemsPlaceholder}</SelectLabel>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
