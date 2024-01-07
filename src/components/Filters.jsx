import { Checkbox } from "@chakra-ui/react";

export default function Filters({
  catProd,
  currentRole,
  checkedItems,
  setCheckedItems,
}) {
  return (
    <section className="filters flex flex-col gap-[30px] max-w-[250px] h-fit bg-white rounded-[15px] py-[30px] px-[27px]">
      <div className="flex flex-col gap-[30px]">
        <h3 className="font-bold text-xl text-grn-950">kategori</h3>
        <ul className="grid gap-[20px] font-normal text-xl text-grn-950">
          {catProd.map((item, index) => {
            return (
              <li key={index}>
                <Checkbox
                  colorScheme={currentRole === "Konsuner" ? "green" : "blue"}
                  size={"lg"}
                  isChecked={checkedItems[index]}
                  onChange={(e) =>
                    setCheckedItems((prevState) => {
                      return { ...prevState, [index]: e.target.checked };
                    })
                  }
                >
                  <p>{catProd[index]}</p>
                </Checkbox>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
