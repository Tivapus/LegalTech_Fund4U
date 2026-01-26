"use client";

import React, { useLayoutEffect, useMemo, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

type Point = {
  date: string; // "YYYY-MM-01"
  amount: number; // เงินที่ได้ในเดือนนั้น (increment)
};

type Props = {
  data: Point[];
  target: number; // เป้าหมายรวม
  height?: number;
};

export default function FundraisingMonthlyChart({
  data,
  target,
  height = 320,
}: Props) {
  const chartRef = useRef<HTMLDivElement | null>(null);

  // ทำให้ date parse ชัวร์ และคำนวณ cumulative ให้เส้น
  const chartData = useMemo(() => {
    const rows = data
      .map((d) => ({
        date: new Date(d.date).getTime(),
        amount: Number(d.amount) || 0,
      }))
      .sort((a, b) => a.date - b.date);

    let running = 0;
    return rows.map((r) => {
      running += r.amount;
      return { ...r, cumulative: running };
    });
  }, [data]);

  useLayoutEffect(() => {
    if (!chartRef.current) return;

    const root = am5.Root.new(chartRef.current);
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        layout: root.verticalLayout,
      }),
    );

    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, { behavior: "zoomX" }),
    );
    cursor.lineY.set("visible", false);

    // X: DateAxis (รายเดือน)
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: "month", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }),
        tooltip: am5.Tooltip.new(root, {}),
      }),
    );

    // Y: ValueAxis
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      }),
    );

    // ✅ 1) Column series = เงินที่ได้ในแต่ละเดือน (increment)
    const monthlySeries = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "เงินที่ได้ต่อเดือน",
        xAxis,
        yAxis,
        valueYField: "amount",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "เดือนนี้: ฿{valueY.formatNumber('#,###')}",
        }),
      }),
    );

    monthlySeries.columns.template.setAll({
      cornerRadiusTL: 6,
      cornerRadiusTR: 6,
      width: am5.percent(65),
    });

    // ✅ 2) Line series = ยอดรวมสะสม (cumulative)
    const cumulativeSeries = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "ยอดรวมสะสม",
        xAxis,
        yAxis,
        valueYField: "cumulative",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "สะสม: ฿{valueY.formatNumber('#,###')}",
        }),
      }),
    );

    cumulativeSeries.strokes.template.setAll({
      strokeWidth: 3,
    });

    cumulativeSeries.bullets.push(() => {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, { radius: 4 }),
      });
    });

    // ✅ 3) Target line (เส้นแนวนอน)
    const targetValue = Number(target);
    if (Number.isFinite(targetValue) && targetValue > 0) {
      const rangeDataItem = yAxis.makeDataItem({ value: targetValue });
      const range = yAxis.createAxisRange(rangeDataItem);

      // เส้น target
      range.get("grid")?.setAll({
        strokeOpacity: 1,
        strokeWidth: 2,
      });

      // label target
      range.get("label")?.setAll({
        text: `Target ฿${targetValue.toLocaleString()}`,
        centerY: am5.p50,
        paddingLeft: 8,
        paddingRight: 8,
        background: am5.RoundedRectangle.new(root, {
          cornerRadiusTL: 6,
          cornerRadiusTR: 6,
          cornerRadiusBL: 6,
          cornerRadiusBR: 6,
        }),
      });
    }

    // legend
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
      }),
    );
    legend.data.setAll([monthlySeries, cumulativeSeries]);

    // format tooltip date
    xAxis.get("dateFormats")!.month = "MMM yyyy";
    xAxis.get("periodChangeDateFormats")!.month = "MMM yyyy";

    // set data
    monthlySeries.data.setAll(chartData);
    cumulativeSeries.data.setAll(chartData);

    monthlySeries.appear(800);
    cumulativeSeries.appear(800);
    chart.appear(800, 100);

    return () => {
      root.dispose();
    };
  }, [chartData, target]);

  return <div ref={chartRef} style={{ width: "100%", height }} />;
}
