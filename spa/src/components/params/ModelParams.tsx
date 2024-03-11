import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Slider } from "../ui/slider";
import { cardStyle, colors } from "@/utils";
import { Label } from "../ui/label";

export default function ModelParams() {
  const data = [
    { value: "bimbo", label: "Bimbo" },
    { value: "coca-cola", label: "Coca-cola" },
    { value: "pepsi", label: "Pepsi" },
    { value: "sabritas", label: "Sabritas" },
  ];
  const SelectDemo = () => {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select a Object</SelectLabel>
              {data.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    );
  };

  type SliderProps = React.ComponentProps<typeof Slider>;


  const SliderDemo = ({ className, ...props }: SliderProps) => {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Slider
          defaultValue={[50]}
          max={100}
          step={1}
          className={cn("w-[60%]", className)}
          {...props}
        />
      </div>
    );
  };
  return (
    <Card style={{ ...cardStyle, display: "flex", justifyContent: "center" }}>
      <CardContent>
        <div style={{ margin: 5 }}>
          <Label style={{ textTransform: "uppercase", color: colors.label }}>
            Estas buscando algo en especifico?
          </Label>
          <SelectDemo />
        </div>
        <div style={{ margin: 5 }}>
          <Label style={{ textTransform: "uppercase", color: colors.label }}>
            Rango de Confianza
          </Label>
          <SliderDemo />
        </div>
      </CardContent>
    </Card>
  );
}
