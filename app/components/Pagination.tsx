"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sizes = [10, 25, 50];

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  const changePageSize = (size: number) => {
    const params = new URLSearchParams(searchParams);
    if (size > itemCount) {
      size = itemCount;
    }
    params.set("pageSize", size.toString());
    router.push("?" + params.toString());
  };

  return (
    <Flex justify={{ initial: "center", sm: "between", md: "between" }}>
      <Flex align="center" gap="2">
        <Button
          color="gray"
          variant="soft"
          disabled={currentPage === 1}
          onClick={() => changePage(1)}
        >
          <DoubleArrowLeftIcon />
        </Button>
        <Button
          color="gray"
          variant="soft"
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
        >
          <ChevronLeftIcon />
        </Button>
        <Text size="2">
          Page {currentPage} of {pageCount}
        </Text>
        <Button
          color="gray"
          variant="soft"
          disabled={currentPage === pageCount}
          onClick={() => changePage(currentPage + 1)}
        >
          <ChevronRightIcon />
        </Button>
        <Button
          color="gray"
          variant="soft"
          disabled={currentPage === pageCount}
          onClick={() => changePage(pageCount)}
        >
          <DoubleArrowRightIcon />
        </Button>
      </Flex>
      <div className="hidden md:block">
        <Flex align="center">
          Per Page:
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button color="gray" variant="soft">
                {pageSize}
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              {sizes.map((size) => (
                <DropdownMenu.Item key={size}>
                  <Button onClick={() => changePageSize(size)} variant="ghost">
                    {size}
                  </Button>
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Flex>
      </div>
    </Flex>
  );
};

export default Pagination;
