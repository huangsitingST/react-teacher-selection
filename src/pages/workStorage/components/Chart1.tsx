import { useRef, useEffect, useState } from "react";
import useMyEchartClass from "@/utils/echart";
import styles from "./Chart1.modules.less";
import { getRateAward } from "@/services/user/UserController";
import type { EChartsOption } from 'echarts'

interface AwardInfo {
  award_num: number
  declare_num: number
  no_award_num: number
}
const getOption = (awardInfo: AwardInfo): EChartsOption => {
  const option: EChartsOption = {
    color: ['#3B5AFF', '#FF6A3B'],
    title: {
      text: '名师评优活动获奖情况',
      textStyle: {
        fontSize: 20
      },
      top: '10%',
      left: '26%',
      subtext: `总申报人数：${
        awardInfo.declare_num
      }人`,
      textAlign: 'center'
    },
    legend: {
      show: true,
      selectedMode: false,
      left: '54%',
      top: 'center',
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 16,
      icon: 'circle',
      orient: 'vertical',
      formatter: (param: string) => {
        let sum = awardInfo.award_num + awardInfo.no_award_num || 1
        if (param === '本校获奖人数') {
          return `${param}：${Math.trunc(
            (awardInfo.award_num / sum) * 100
          )}%  |  ${awardInfo.award_num}人`
        }
        return `${param}：${Math.trunc(
          (awardInfo.no_award_num / sum) * 100
        )}%  |  ${awardInfo.no_award_num}人`
      }
    },
    series: [
      {
        name: 'structureChart',
        type: 'pie',
        radius: ['30%', '50%'],
        center: ['26%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false
        },
        data: [
          { value: awardInfo.award_num, name: '本校获奖人数' },
          { value: awardInfo.no_award_num, name: '本校未获奖人数' }
        ]
      }
    ]
  }
  return option
}

const Chart1: React.FC = () => {
  const [myChart, setMyChart] = useState<useMyEchartClass | null>(null);
  const [awardInfo, setAwardInfo] = useState<AwardInfo>({
    award_num: 0,
    declare_num: 0,
    no_award_num: 0,
  });
  const ref = useRef<HTMLDivElement>(null);

  const getData = async () => {
    const {data} = await getRateAward();
    setAwardInfo({
      award_num: data.award_num,
      declare_num: data.declare_num,
      no_award_num: data.declare_num - data.award_num,
    });
    const options = getOption(awardInfo);
    myChart?.setOption(options as EChartsOption);
  };

  useEffect(() => {
    if (myChart) {
      getData();
    }
  }, [myChart]);

  useEffect(() => {
    
    if (ref.current) {
      const chart = new useMyEchartClass({ ref });
      console.log(ref);
      setMyChart(chart);
    }
  }, [ref]);

  return <div ref={ref} className={styles.chart1}></div>;
};

export default Chart1;
