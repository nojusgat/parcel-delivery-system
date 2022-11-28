import {
  Table,
  Pagination,
  Badge,
  Button,
  Tooltip,
  Spinner,
} from "flowbite-react";
import React from "react";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { getParcels, deleteParcel as apiDeleteParcel } from "../../utils/api";
import { Loader } from "../../components/loader";

import { BsPencil, BsTrash, BsPlusLg } from "react-icons/bs";
import { ConfirmModal } from "../../components/confirmModal";

function ParcelDetails({ parcel, toggleRender, setToggleRender }: any) {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [loadingDelete, setLoadingDelete] = React.useState(false);

  const editParcel = () => {
    console.log(parcel.parcelNumber);
  };

  const showDeleteParcelModal = () => {
    setShowDeleteModal(true);
  };

  const deleteParcel = () => {
    setShowDeleteModal(false);
    setLoadingDelete(true);
    apiDeleteParcel(parcel.parcelNumber)
      .then((res) => {
        if (res?.status === 204) {
          setToggleRender(!toggleRender);
        }
      })
      .finally(() => {
        setLoadingDelete(false);
      });
  };

  return (
    <>
      <Table.Row
        className="bg-white dark:border-gray-700 dark:bg-gray-800"
        key={parcel.parcelNumber}
      >
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {parcel.parcelNumber}
        </Table.Cell>
        <Table.Cell>
          <span className="flex flex-col gap-2">
            <span>{parcel.senderName}</span>
            <span>{parcel.senderAddress}</span>
          </span>
        </Table.Cell>
        <Table.Cell>
          <span className="flex flex-col gap-2">
            <span>{parcel.receiverName}</span>
            <span>{parcel.receiverAddress}</span>
          </span>
        </Table.Cell>
        <Table.Cell>{parcel.weight} kg</Table.Cell>
        <Table.Cell>{parcel.price} €</Table.Cell>
        <Table.Cell>
          <span className="flex flex-wrap">
            <Badge
              color={
                parcel.status === "Pending"
                  ? "warning"
                  : parcel.status === "In progress"
                  ? "pink"
                  : "success"
              }
              size="sm"
              className="text-center"
            >
              {parcel.status}
            </Badge>
          </span>
        </Table.Cell>
        <Table.Cell>
          {parcel.courier ? (
            parcel.courier?.firstname + " " + parcel.courier?.lastname
          ) : (
            <Tooltip content="Click to assign">
              <b className="cursor-pointer">None</b>
            </Tooltip>
          )}
        </Table.Cell>
        <Table.Cell>
          <span className="flex flex-wrap gap-2">
            <Tooltip content="Edit Parcel">
              <Button size="sm" onClick={editParcel}>
                <BsPencil className="h-4 w-4" />
              </Button>
            </Tooltip>
            <Tooltip content="Delete Parcel">
              {loadingDelete ? (
                <Button size="sm" color="failure">
                  <Spinner size="sm" light={true} />
                </Button>
              ) : (
                <Button
                  size="sm"
                  color="failure"
                  onClick={showDeleteParcelModal}
                >
                  <BsTrash className="h-4 w-4" />
                </Button>
              )}
            </Tooltip>
          </span>
        </Table.Cell>
      </Table.Row>

      <ConfirmModal
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        onConfirm={deleteParcel}
        message={`Are you sure you want to delete ${parcel.parcelNumber} parcel?`}
        confirmText={"Yes, I'm sure"}
        cancelText={"No, cancel"}
      />
    </>
  );
}

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
            <Table.HeadCell>Sender</Table.HeadCell>
            <Table.HeadCell>Receiver</Table.HeadCell>
            <Table.HeadCell>Weight</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Courier</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Actions</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {parcels?.results.map((parcel: any) => (
              <ParcelDetails
                parcel={parcel}
                toggleRender={toggleRender}
                setToggleRender={setToggleRender}
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
