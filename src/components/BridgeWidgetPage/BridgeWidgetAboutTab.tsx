import { TabCard } from "@/components/TabCard/TabCard"

export const BridgeWidgetAboutTab = () => {
  return (
    <TabCard>
      <div className="flex flex-col gap-2 text-[16px] text-slate-500">
        <p>
          Aurora Cloud offers seamless interoperability between Virtual Chains
          and major blockchain ecosystems like NEAR, Aurora, and Ethereum
          through native bridging. This functionality is built on the robust and
          battle-tested Rainbow Bridge.
        </p>
        <p>
          To simplify integration, we’ve packaged the bridge into a universal,
          customizable widget. This plug-and-play solution can be easily
          embedded as a button in your web application, enabling users to
          transfer assets across chains with just a few
        </p>
      </div>
    </TabCard>
  )
}
