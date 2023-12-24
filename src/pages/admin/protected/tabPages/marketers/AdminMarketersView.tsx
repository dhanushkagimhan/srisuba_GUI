import { Checkbox, Table } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useState } from "react";

export default function AdminMarketerView() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalDataCount, setTotalDataCount] = useState<number>();
  const [isOnlyWithdrawAvailable, setIsOnlyWithdrawAvailable] =
    useState<boolean>(false);
  const [orderDesc, setOrderDesc] = useState<boolean>(false);

  return (
    <div>
      <div className="text-lg font-medium">Affiliate marketers</div>
      <div className="my-4 p-4 bg-slate-100">
        <div className="flex flex-row gap-4 items-center">
          <div>
            <Checkbox
              onChange={(e: CheckboxChangeEvent) =>
                setIsOnlyWithdrawAvailable(e.target.checked)
              }
            >
              Only Withdraw Available
            </Checkbox>
          </div>
          <div>
            <Checkbox
              onChange={(e: CheckboxChangeEvent) =>
                setOrderDesc(e.target.checked)
              }
            >
              Order Desc
            </Checkbox>
          </div>
        </div>
      </div>

      <div>
        <Table
          //   dataSource={proposers}
          //   columns={proposersTableColumns}
          scroll={{ x: true }}
          //   loading={adminProposersQuery.isPending}
          pagination={{
            current: currentPage,
            onChange: (page) => setCurrentPage(page),
            pageSize: 10,
            total: totalDataCount,
            showSizeChanger: false,
          }}
        />
      </div>
    </div>
  );
}
