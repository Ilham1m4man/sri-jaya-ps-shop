import {
  Text,
  Checkbox,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import Spinner from "./loaders/Spinner";

export default function CartTable({
  isLoading,
  dataProduct,
  currentRole,
  checkedItems,
  counter,
  disabled,
  setIsChecked,
  setCheckedItems,
  setCounter,
}) {
  const objProduct = Object.values(dataProduct);

  const allChecked = Object.values(checkedItems).every(Boolean);
  const isIndeterminate =
    Object.values(checkedItems).some(Boolean) && !allChecked;

  allChecked === true
    ? setIsChecked(allChecked)
    : setIsChecked(isIndeterminate);

  const customClass = `${
    currentRole === "Konsumer" ? "fill-grn-400" : "fill-ble-400"
  }`;

  return (
    <>
      {isLoading ? (
        <Spinner customClass={customClass} />
      ) : (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>
                  <Checkbox
                    colorScheme={currentRole === "Konsuner" ? "green" : "blue"}
                    size={"lg"}
                    className="text-gry-cart"
                    isChecked={allChecked}
                    isIndeterminate={isIndeterminate}
                    onChange={(e) =>
                      Object.entries(Object.entries(counter)).map(
                        (item, index) => {
                          setCheckedItems((prevState) => {
                            return { ...prevState, [index]: e.target.checked };
                          });
                        }
                      )
                    }
                  >
                    <Text fontSize={12}>P R O D U K</Text>
                  </Checkbox>
                </Th>
                <Th>
                  <Text fontWeight={"bold"} className="text-gry-cart">
                    K U A N T I T A S
                  </Text>
                </Th>
                <Th>
                  <Text fontWeight={"bold"} className="text-gry-cart">
                    H A R G A
                  </Text>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {Object.entries(Object.entries(counter)).map((item, index) => {
                const productInfo = objProduct[index];
                const { name, price, category, desc, userGuide, productImg } =
                  productInfo;
                const { priceEcer, priceBakul } = price;
                const { mainImg } = productImg;
                return (
                  <Tr key={index}>
                    <Td>
                      <Checkbox
                        colorScheme={
                          currentRole === "Konsuner" ? "green" : "blue"
                        }
                        size={"lg"}
                        isChecked={checkedItems[index]}
                        onChange={(e) =>
                          setCheckedItems((prevState) => {
                            return { ...prevState, [index]: e.target.checked };
                          })
                        }
                      >
                        <div className="flex justify-between items-center gap-4 font-normal text-grn-950">
                          <div className="border-2 border-footer_fontClr rounded-xl">
                            <img
                              className="min-w-[100px] max-w-[100px] object-contain aspect-square"
                              src={mainImg.URL}
                              alt={name}
                            />
                          </div>
                          <p className="whitespace-normal">{name}</p>
                        </div>
                      </Checkbox>
                    </Td>
                    <Td>
                      <div className="flex item-center h-[40px] rounded-lg bg-transparent">
                        <button
                          onClick={() =>
                            setCounter((prevState) => {
                              return {
                                ...prevState,
                                [index]: parseInt(prevState[index]) - 1,
                              };
                            })
                          }
                          disabled={disabled[index]}
                          className={`border-[2px] border-black bg-gry-counterClr text-black hover:text-gray-700 ${
                            currentRole === "Konsumer"
                              ? "hover:bg-grn-300"
                              : "hover:bg-ble-300"
                          } h-[70%] w-[15px] sm:w-[25px] rounded-l-[8px] cursor-pointer outline-none`}
                        >
                          <span className="m-auto text-base font-bold">−</span>
                        </button>
                        <input
                          type="text"
                          className="border-y-[2px] border-black focus:outline-none text-center h-[70%] w-[20px] sm:w-[30px] bg-white font-semibold hover:text-black focus:text-black text-xs md:text-sm cursor-default flex items-center text-grn-950  outline-none"
                          name="custom-input-number"
                          value={counter[index]}
                          disabled={true}
                        ></input>
                        <button
                          onClick={() =>
                            setCounter((prevState) => {
                              return {
                                ...prevState,
                                [index]: parseInt(prevState[index]) + 1,
                              };
                            })
                          }
                          className={`bg-gry-counterClr border-[2px] border-black text-black hover:text-gray-700 ${
                            currentRole === "Konsumer"
                              ? "hover:bg-grn-300"
                              : "hover:bg-ble-300"
                          } h-[70%] w-[15px] sm:w-[25px] rounded-r-[8px] cursor-pointer`}
                        >
                          <span className="m-auto text-base font-bold">+</span>
                        </button>
                      </div>
                    </Td>
                    <Td>
                      <p>
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(
                          counter[index] *
                            (currentRole === "Konsumer"
                              ? priceEcer
                              : priceBakul)
                        )}
                      </p>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
