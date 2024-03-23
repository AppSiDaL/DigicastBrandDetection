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

interface ModelParamsProps {
  confidence: number;
  setConfidence: React.Dispatch<React.SetStateAction<number>>;
  confidenceRef: any;
}

export default function ModelParams({
  confidence,
  confidenceRef,
  setConfidence,
}: ModelParamsProps) {
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
            <SelectValue placeholder="Select a object" />
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
          max={100}
          step={1}
          defaultValue={[confidence]}
          onValueCommit={(value) => {
            confidenceRef.current = value[0];
            setConfidence(value[0]);
          }}
          className={cn("w-[80%]", className)}
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
          <p style={{ display: "flex", justifyContent: "center" }}>
            {confidence}
          </p>

          <div style={{ justifyContent: "space-between", display: "flex" }}>
            <p>0</p>
            <p>100</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
