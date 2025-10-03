import { useGetProductField } from "@/hooks/useGetProductField"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FilterTypes } from "@/types/filters"

type FilterStyleProps = {
  setFilterStyle: (style: string) => void
}

const FilterStyle = (props: FilterStyleProps) => {
  const { result, loading }: FilterTypes = useGetProductField()
  const { setFilterStyle } = props

  return (
    <div className="my-5">
      <h1 className="mb-3 font-serif text-3xl"> Estilos</h1>
      {loading && result !== null && (
        <h2>cargando estilos</h2>
      )}

      <RadioGroup onValueChange={(value) => setFilterStyle(value)}>
        {result !== null && result.schema.attributes.style.enum.map((style: string) => (

          <div key={style} className="flex items-center space-x-2">
            <RadioGroupItem value={style} id={style} />
            <Label htmlFor={style}>{style}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterStyle