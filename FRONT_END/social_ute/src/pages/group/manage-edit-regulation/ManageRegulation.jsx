import { selectRolePermission } from "app/slice/group/group.slice";
import LoadingComponent from "combine/loading-component";
import { Button } from "components/button";
import { Textarea } from "components/textarea";
import { TYPELOADING } from "constants/type.const";
import { FastField, FieldArray, Form, Formik } from "formik";
import { useGetAllRegulations } from "hook/group/useGetAllRegulations";
import { useEditRegulationManageGroup } from "hook/manage-group/useEditRegulation";
import { PencilLine } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ManageRegulation = () => {
  const { groupId } = useParams();
  const rolePermission = useSelector(selectRolePermission);
  const { permission, role } = rolePermission;
  const { isLoading, regulation, fetchAllRegulations } = useGetAllRegulations();
  const { isLoading: isLoadRegulate, handleEditRegulationManage } =
    useEditRegulationManageGroup();

  useEffect(() => {
    if (!groupId) return;
    fetchAllRegulations(groupId);
  }, [fetchAllRegulations, groupId]);

  return (
    <div className="w-full h-full mt-10 flex flex-col gap-4 p-10">
      <p className="text-xl font-quick_sans font-bold">Nội quy của nhóm</p>
      <LoadingComponent type={TYPELOADING.TITLE} condition={isLoading}>
        <Formik
          initialValues={{ manageRegulation: regulation || [] }}
          enableReinitialize={true}
          onSubmit={(values) =>
            handleEditRegulationManage(
              permission,
              role,
              groupId,
              values.manageRegulation
            )
          }
        >
          {({ values }) => {
            return (
              <Form
                name="manageRegulation"
                className="flex flex-col gap-4 w-full items-end"
              >
                <FieldArray name="manageRegulation" disabled={isLoading}>
                  {({ push, remove }) => (
                    <div className="grid lg:grid-cols-2 sm:grid-cols-1 w-full items-start justify-start gap-2 font-quick_sans">
                      {values.manageRegulation.length > 0 &&
                        values.manageRegulation.map((regulation, index) => (
                          <FastField
                            key={index}
                            name={`manageRegulation[${index}]`}
                          >
                            {({ field }) => (
                              <div className="grid gap-2 w-full">
                                <label>Điều khoản : {index + 1}</label>
                                <Textarea
                                  {...field}
                                  placeholder="Nhập nội quy"
                                  className="border border-black dark:border-white dark:placeholder:text-white"
                                />
                                <Button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    remove(index);
                                  }}
                                >
                                  Xóa
                                </Button>
                              </div>
                            )}
                          </FastField>
                        ))}
                      <Button
                        className="p-2"
                        onClick={(e) => {
                          e.preventDefault();
                          push("");
                        }}
                      >
                        Thêm nội quy
                      </Button>
                    </div>
                  )}
                </FieldArray>

                <Button
                  className="p-2 mt-4 flex gap-2 w-[200px] font-quick_sans"
                  type="submit"
                >
                  Chỉnh sửa nội quy
                  <PencilLine size={18} strokeWidth={1.5} />
                </Button>
              </Form>
            );
          }}
        </Formik>
      </LoadingComponent>
    </div>
  );
};

export default ManageRegulation;
