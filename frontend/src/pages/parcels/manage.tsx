import { Table, Pagination, Button, Tooltip } from "flowbite-react";
import React from "react";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { getParcels } from "../../utils/api";
import { Loader } from "../../components/loader";

import { BsPlusLg } from "react-icons/bs";
import { ParcelDetails } from "../../components/parcelDetails";

export default function ManageParcels() {
  const [toggleRender, setToggleRender] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [parcels, setParcels] = React.useState<any>(null);

  const [loadingHeader, setLoadingHeader] = React.useState(true);
  const [loadingParcels, setLoadingParcels] = React.useState(true);

  React.useEffect(() => {
    getParcels(page)
      .then((res) => {
        setParcels(res?.data);
      })
      .finally(() => {
        setLoadingParcels(false);
      });
  }, [page, toggleRender]);

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const createParcel = () => {
    console.log("create parcel");
  };

  return (
    <>
      {loadingHeader || loadingParcels ? <Loader /> : null}
      <div className="container mx-auto px-4">
        <Header loading={loadingHeader} setLoading={setLoadingHeader} />
        <div className="flex flex-wrap gap-2 mb-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Parcels
          </h1>
          <Tooltip content="Create a new Parcel">
            <Button size="sm" onClick={createParcel}>
              <BsPlusLg className="h-4 w-4" />
            </Button>
          </Tooltip>
        </div>

        <Table>
          <Table.Head>
            <Table.HeadCell>#</Table.HeadCell>
            <Table.HeadCell>Courier</Table.HeadCell>
            <Table.HeadCell>Sender</Table.HeadCell>
            <Table.HeadCell>Receiver</Table.HeadCell>
            <Table.HeadCell>Weight</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Actions</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {parcels?.results.map((parcel: any) => (
              <ParcelDetails
                key={parcel.parcelNumber}
                parcelData={parcel}
                toggleRender={toggleRender}
                setToggleRender={setToggleRender}
                showCourier={true}
                showEditDeleteBtn={true}
              />
            ))}
          </Table.Body>
        </Table>
        {parcels?.total_pages > 1 ? (
          <Pagination
            currentPage={page}
            onPageChange={onPageChange}
            showIcons={true}
            totalPages={parcels?.total_pages || 1}
          />
        ) : null}
        <Footer />
      </div>
    </>
  );
}
