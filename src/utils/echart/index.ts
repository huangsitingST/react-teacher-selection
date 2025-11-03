import React from "react";
import { useState, useEffect } from "react";
import echarts from './charts'
import type { EChartsOption } from 'echarts'


interface IMyEchartProps {
  ref: React.RefObject<HTMLDivElement>;
}

class useMyEchartClass {
  public instance: echarts.ECharts | null = null;
  public ref: React.RefObject<HTMLDivElement>;
  public observer: ResizeObserver | null = null;

  constructor(props: IMyEchartProps) {
    this.ref = props.ref;
    this.initChart()
    this.domResize()
  }

  initChart = () => {
    this.instance = echarts.init(this.ref.current);
    return this.getInstance();
  };

  setOption = (options: EChartsOption) => {       
    if (this.instance) {
      this.instance.setOption(options);
    }
  };
  getInstance = () => {
    return this.instance;
  };
  domResize = () => {
    console.log(this.ref.current, 'dom.value')

    this.observer = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        this.instance?.resize()
      })
    })
    this.observer.observe(this.ref.current!)
  }
  resetDomResize = () => {
    this.observer?.disconnect()
    this.observer?.unobserve(this.ref.current!)
    this.observer = null
  }
};

export default useMyEchartClass;    
