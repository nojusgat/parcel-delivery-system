import { Table, Button, Tooltip, Spinner } from "flowbite-react";
import React from "react";
import { BsJournalMinus, BsPencil, BsTrash } from "react-icons/bs";
import { ConfirmModal } from "./modals/confirmModal";
import {
  deleteCourier as apiDeleteCourier,
  updateCourier,
  updateParcel,
} from "../utils/api";

export function CourierDetails({
  courierData,
  toggleRender,
  setToggleRender,
  showEditDeleteBtn = false,
  showUser = false,
  showCar = false,
  showAssignParcelBtn = false,
  setModalOpen = () => {},
  setParcel = () => {},
}: any) {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showUnassignModal, setShowUnassignModal] = React.useState(false);
  const [loadingDelete, setLoadingDelete] = React.useState(false);
  const [loadingAssign, setLoadingAssign] = React.useState(false);

  const [courier, setCourier] = React.useState<any>(courierData);

  const editCourier = () => {
    if (!showEditDeleteBtn) return;
    setShowEditModal(true);
  };

  const showDeleteCourierModal = () => {
    if (!showEditDeleteBtn) return;
    setShowDeleteModal(true);
  };

  const showUnassignUserModal = () => {
    if (!showEditDeleteBtn) return;
    setShowUnassignModal(true);
  };

  const deleteCourier = () => {
    if (!showEditDeleteBtn) return;
    setShowDeleteModal(false);
    setLoadingDelete(true);
    apiDeleteCourier(courier.id)
      .then((res) => {
        if (res?.status === 204) {
          setToggleRender(!toggleRender);
        }
      })
      .finally(() => {
        setLoadingDelete(false);
      });
  };

  const unassignUser = () => {
    if (!showEditDeleteBtn) return;
    setShowUnassignModal(false);
    setLoadingAssign(true);
    updateCourier(courier.id, { userId: null })
      .then((res) => {
        if (res?.status === 200) {
          setCourier(res.data);
        }
      })
      .finally(() => {
        setToggleRender(!toggleRender);
        setLoadingAssign(false);
      });
  };

  const assignToParcel = () => {
    if (!showAssignParcelBtn) return;
    setLoadingAssign(true);

    updateParcel(showAssignParcelBtn, { courierId: courier.id })
      .then((res) => {
        if (res?.status === 200) {
          setParcel(res.data);
          setToggleRender(!toggleRender);
          setModalOpen(false);
        }
      })
      .finally(() => {
        setLoadingAssign(false);
      });
  };

  return (
    <>
      <Table.Row
        className="bg-white dark:border-gray-700 dark:bg-gray-800"
        key={courier.id}
      >
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {courier.firstname}
        </Table.Cell>
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {courier.lastname}
        </Table.Cell>
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          <a href={`tel:${courier.phone}`} className="hover:underline">
            {courier.phone}
          </a>
        </Table.Cell>
        {showUser ? (
          <Table.Cell>
            {courier.user ? (
              <span>should_be_user_info</span>
            ) : (
              <Tooltip content="Click to assign">
                <b className="cursor-pointer">None</b>
              </Tooltip>
            )}
          </Table.Cell>
        ) : null}
        {showCar ? (
          <Table.Cell>
            {courier.car ? (
              <span>should_be_car_info</span>
            ) : (
              <Tooltip content="Click to assign">
                <b className="cursor-pointer">None</b>
              </Tooltip>
            )}
          </Table.Cell>
        ) : null}
        {showEditDeleteBtn ? (
          <Table.Cell>
            <span className="flex flex-wrap gap-2">
              <Button.Group outline={true}>
                <Button size="sm" onClick={editCourier}>
                  <Tooltip content="Edit Courier">
                    <BsPencil className="h-4 w-4" />
                  </Tooltip>
                </Button>
                {loadingDelete ? (
                  <Button size="sm" color="failure">
                    <Spinner size="sm" className="h-4 w-4" light={true} />
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    color="failure"
                    onClick={showDeleteCourierModal}
                  >
                    <Tooltip content="Delete Courier">
                      <BsTrash className="h-4 w-4" />
                    </Tooltip>
                  </Button>
                )}
                {loadingAssign ? (
                  <Button size="sm" color="purple">
                    <Spinner size="sm" className="h-4 w-4" light={true} />
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    color="purple"
                    onClick={showUnassignUserModal}
                    disabled={courier.user == null}
                  >
                    <Tooltip content="Unassign User">
                      <BsJournalMinus className="h-4 w-4" />
                    </Tooltip>
                  </Button>
                )}
                {loadingAssign ? (
                  <Button size="sm" color="dark">
                    <Spinner size="sm" className="h-4 w-4" light={true} />
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    color="dark"
                    onClick={showUnassignUserModal}
                    disabled={courier.car == null}
                  >
                    <Tooltip content="Unassign Car">
                      <BsJournalMinus className="h-4 w-4" />
                    </Tooltip>
                  </Button>
                )}
              </Button.Group>
            </span>
          </Table.Cell>
        ) : null}
        {showAssignParcelBtn ? (
          loadingAssign ? (
            <Table.Cell>
              <Button>
                <Spinner size="sm" light={true} className="mr-3" />
                <span>Assigning...</span>
              </Button>
            </Table.Cell>
          ) : (
            <Table.Cell>
              <Button onClick={assignToParcel}>Assign</Button>
            </Table.Cell>
          )
        ) : null}
      </Table.Row>

      {showEditDeleteBtn ? (
        <>
          <ConfirmModal
            show={showDeleteModal}
            setShow={setShowDeleteModal}
            onConfirm={deleteCourier}
            message={`Are you sure you want to delete ${courier.firstname} ${courier.lastname}?`}
            confirmText={"Yes, I'm sure"}
            cancelText={"No, cancel"}
          />
          <ConfirmModal
            show={showUnassignModal}
            setShow={setShowUnassignModal}
            onConfirm={unassignUser}
            message={`Are you sure you want to unassign user from courier ${courier.firstname} ${courier.lastname}?`}
            confirmText={"Yes, I'm sure"}
            cancelText={"No, cancel"}
            confirmColor="purple"
          />
          {/* <EditParcelModal
            show={showEditModal}
            setShow={setShowEditModal}
            parcel={courier}
            setParcel={setCourier}
          /> */}
        </>
      ) : null}
    </>
  );
}
