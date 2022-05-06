import type { NextPage } from 'next'
import { useCallback, useEffect, useState } from 'react';
import { DndProvider, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import Application from '../components/application/application';
import { CustomDragLayer } from '../components/custom-drag-layer/custom-drag-layer';
import Icon from '../components/icon/icon';

import styles from './index.module.css';

const Homescreen: NextPage = () => {

  const [icons, setIcons] = useState<any>({
    team: { top: 180, left: 20, name: "team", filename: "team.txt", image: "/text-icon.png"},
    roadmap: { top: 20, left: 80, name: "roadmap", filename: "roadmap.txt", image: "/text-icon.png" },
  });

  const [applications, setApplications] = useState<any>({
    team: {name: "team", applicationName: "team.txt", width: 250, height: 250, top: 50, left: 50, isOpen: true, children: null},
    roadmap: {name: "roadmap", applicationName: "roadmap.txt", width: 250, height: 250, top: 50, left: 50, isOpen: false, children: null},
  })

  // specify apps here
  const move = useCallback((type: "app" | "icon", name: "team" | "roadmap", left: number, top: number, data?: any) => {
    if (type === 'icon') {
      setIcons({...icons, [name]: {...icons[name], left, top}})
    } else {
      setApplications({...applications, [name]: {...applications[name], ...data, left, top}})
    }
  },
  [icons, setIcons]);

  const [, dropRef] = useDrop(
    () => ({
      accept: ['icon', 'app'],
      drop(item: any, monitor) {
        console.log(item);
        const delta = monitor.getDifferenceFromInitialOffset()
        const top = Math.round(item?.top + delta?.y)
        const left = Math.round(item?.left + delta?.x)
        move(item.type, item.name, left, top, item.data);
        return undefined
      },
    }),
    [move],
  );

  const openApplication = (name: string) => {
    setApplications({...applications, [name]: {...applications[name], isOpen: true}});
  }

  const closeApplication = (name: string) => {
    setApplications({...applications, [name]: {...applications[name], isOpen: false}})
  }

  return (
    <main className={styles.main} ref={dropRef}>
      <CustomDragLayer />
      {
        Object.keys(icons).map((icon: any) => {
          const { name, image, left, top, filename} = icons[icon];
          return <Icon name={name} top={top} left={left} image={image} filename={filename} key={icon} open={openApplication} />
        })
      }
      {
        Object.keys(applications).map((app: any) => {
          const {name, top, left, children, isOpen, applicationName, width, height} = applications[app];
          return <Application name={name} top={top} left={left} width={width} height={height} isOpen={isOpen} key={name} applicationName={applicationName} close={closeApplication}>{children}</Application>
        })
      }
    </main>
  )
}

export default Homescreen;
