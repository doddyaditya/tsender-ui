"use client"

import InputField from "./ui/InputField";
import { useState, useMemo } from "react";
import { readContract, waitForTransactionReceipt } from "@wagmi/core"
import { useChainId, useConfig, useConnection, useWriteContract } from "wagmi"
import { chainsToTSender, erc20Abi, tsenderAbi } from "@/app/utils/constants";
import { calculateTotal } from "@/app/utils";
import { hash } from "crypto";

export default function AirdropForm() {
    const [tokenAddress, setTokenAddress] = useState("")
    const [recipients, setRecipients] = useState("")
    const [amounts, setAmounts] = useState("")
    const chainId = useChainId()
    const config = useConfig()
    const connection = useConnection()
    const total: number = useMemo(() => calculateTotal(amounts), [amounts])
    const { data: hash, isPending, mutateAsync } = useWriteContract();

    async function handleSubmit() {
        const tSenderAddress = chainsToTSender[chainId]["tsender"]
        const approvedAmount = await getApprovedAmount(tSenderAddress)
        if (approvedAmount < total) {
            const approvalHash = await mutateAsync({
                abi: erc20Abi,
                address: tokenAddress as `0x${string}`,
                functionName: "approve",
                args: [tSenderAddress as `0x${string}`, BigInt(total)]
            })
            const approvalReceipt = await waitForTransactionReceipt(config, {
                hash: approvalHash
            })
            console.log("Approval confirmed", approvalReceipt)
            await mutateAsync({
                abi: tsenderAbi,
                address: tSenderAddress as `0x${string}`,
                functionName: "airdropERC20",
                args: [
                    tokenAddress as `0x${string}`,
                    recipients.split('/[\n,]+/').map(address => address.trim()).filter(recipients => recipients !== ''),
                    amounts.split('/[\n,]+/').map(amount => amount.trim()).filter(amount => amount !== ''),
                    BigInt(total)
                ]
            })
        } else {
            await mutateAsync({
                abi: tsenderAbi,
                address: tSenderAddress as `0x${string}`,
                functionName: "airdropERC20",
                args: [
                    tokenAddress as `0x${string}`,
                    recipients.split('/[\n,]+/').map(address => address.trim()).filter(recipients => recipients !== ''),
                    amounts.split('/[\n,]+/').map(amount => amount.trim()).filter(amount => amount !== ''),
                    BigInt(total)
                ]
            })
        }
    }

    async function getApprovedAmount(tSenderAddress: string | null): Promise<number> {
        if (!tSenderAddress) {
            alert("No address found, please use a supported chain")
            return 0
        }
        const amount = await readContract(
            config,
            {
                address: tokenAddress as `0x${string}`,
                abi: erc20Abi,
                functionName: "allowance",
                args: [connection.address, (tSenderAddress) as `0x${string}`]
            }
        )
        return amount as number
    }

    return (
        <div>
            <InputField
                label="Token Address"
                placeholder="0x"
                value={tokenAddress}
                onChange={(value) => setTokenAddress(value)}
            />
            <InputField
                label="Recipients (comma or new line separated)"
                placeholder="0x123..., 0x456..."
                value={recipients}
                large={true}
                onChange={(value) => setRecipients(value)}
            />
            <InputField
                label="Amounts (wei; comma or new line separated)"
                placeholder="100, 200, 300"
                value={amounts}
                large={true}
                onChange={(value) => setAmounts(value)}
            />
            <button onClick={handleSubmit} className="
    inline-flex items-center justify-center gap-2
    rounded-lg bg-indigo-600 px-5 py-2.5
    text-sm font-semibold text-white
    shadow-sm shadow-indigo-600/20
    transition-all duration-200 ease-in-out
    hover:bg-indigo-500 hover:shadow-md hover:shadow-indigo-600/30
    active:bg-indigo-700 active:scale-[0.98]
    focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
    disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-indigo-600
  ">
                Send tokens
            </button>
        </div >
    );
}