"use client"

import Papa from "papaparse"
import { useCallback, useMemo, useState } from "react"
import toast from "react-hot-toast"
import Table from "@/components/Table"
import { Button } from "@/components/Button"
import { BulkImportModal } from "./BulkImportModal"

type BulkImportProps = {
  listId: number
  teamKey: string
}

export const BulkImport = ({ listId, teamKey }: BulkImportProps) => {
  const [rows, setRows] = useState<string[][]>([])
  const [columnToImport, setColumnToImport] = useState<number>(-1)

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) {
      return
    }

    Papa.parse<string[]>(file, {
      complete(results) {
        if (results.errors.length) {
          console.error("Parsing errors:", results.errors)
          toast.error("Failed to parse file.")

          return
        }

        setRows(results.data)
      },
    })
  }, [])

  const numberOfColumns = useMemo(
    () =>
      rows.reduce((acc, row) => {
        return Math.max(acc, row.length)
      }, 0),
    [rows],
  )

  return (
    <>
      {rows.length === 0 && (
        <p className="text-gray-500">Choose a CSV file to import</p>
      )}

      <input type="file" onChange={onChange} accept=".csv" />

      {rows.length > 0 && (
        <>
          <p className="text-gray-500">
            Select the column you want to import from
          </p>
          <Table>
            <Table.TH>Column</Table.TH>
            <Table.TH>Sample value</Table.TH>
            <Table.TH hidden>Actions</Table.TH>
            {Array(numberOfColumns)
              .fill(null)
              .map((_row, index) => {
                const sampleValue = rows
                  .slice(rows.length > 1 ? 1 : 0)
                  .find((row) => row[index])?.[index]

                if (!sampleValue) {
                  return null
                }

                return (
                  <Table.TR key={index}>
                    <Table.TD dark>{index + 1}</Table.TD>
                    <Table.TD dark>{sampleValue}</Table.TD>
                    <Table.TD align="right">
                      <Button
                        variant={
                          columnToImport === index ? "primary" : "border"
                        }
                        onClick={() => {
                          setColumnToImport(index)
                        }}
                      >
                        Import
                      </Button>
                    </Table.TD>
                  </Table.TR>
                )
              })}
          </Table>
        </>
      )}
      <BulkImportModal
        title={`Column ${columnToImport + 1}`}
        listId={listId}
        isOpen={columnToImport >= 0}
        items={rows.map((row) => row[columnToImport])}
        teamKey={teamKey}
        onClose={() => {
          setColumnToImport(-1)
        }}
      />
    </>
  )
}
