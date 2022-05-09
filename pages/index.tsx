import type { NextPage } from 'next'
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDrop } from 'react-dnd'
import Folder from '../applications/folder/folder';
import Roadmap from '../applications/roadmap/roadmap';
import Team from '../applications/team/team';
import Application from '../components/application/application';
import { CustomDragLayer } from '../components/custom-drag-layer/custom-drag-layer';
import Icon from '../components/icon/icon';
import {IApplications, IFolderItems, IIcons, TFolderItem} from '../utils/misc';

import styles from './index.module.css';

const folderTest: IFolderItems = {dog: {name: 'dog.png', image: 'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg'}, cat: {name: 'cat.png', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg'}};

const Homescreen: NextPage = () => {
  
  const [index, setIndex] = useState<number>(0);

  const updateApplication = (application: string, field: string, updatedChildren: any) => {
    setApplications((prev: any) => {
      return {...prev, [application]: {...prev[application], [field]: updatedChildren }};
    })
  }

  const [icons, setIcons] = useState<IIcons>({
    "team": { top: 180, left: 20, name: "team", filename: "team.txt", image: "/text-icon.png", type: "icon"},
    "roadmap": { top: 20, left: 80, name: "roadmap", filename: "roadmap.txt", image: "/text-icon.png", type: "icon"},
    "folder": {top: 200, left: 200, name: "folder", filename: "folder n1", image: "/folder-icon.png", type: "icon"},
  });
  
  const [applications, setApplications] = useState<IApplications>({
    team: {name: "team", applicationName: "team.txt", index: 1, width: 250, height: 250, top: 50, left: 50, isOpen: false, isZoomed: false, children: <Team />},
    roadmap: {name: "roadmap", applicationName: "roadmap.txt", index: 0, width: 250, height: 250, top: 50, left: 50, isOpen: false, isZoomed: false, children: <Roadmap />},
    folder: {name: "folder", applicationName: "folder n1", style: {'display': 'flex'}, index: 2, width: 250, height: 250, top: 50, left: 50, isOpen: true, isZoomed: false, drilledData: {item: {name: '', image: ''}}, children: <Folder item={{name: '', image: ''}} items={folderTest} update={updateApplication} />}
  })
  
  // useEffect(() => {
  //   console.log(applications.folder);
  // }, [applications])
  // specify apps here
  const move = useCallback((type: "app" | "icon", name: "team" | "roadmap", left: number, top: number, data?: any) => {
    if (type === 'icon') {
      setIcons({...icons, [name]: {...icons[name], left, top}})
    } else {
      setApplications((prev: any) => {
        setIndex(index + 1)
        return {...prev, [name]: {...prev[name], ...data, left, top, index}}
      })
    }
  },
  [icons, setIcons, index, setIndex]);

  const [, dropRef] = useDrop(
    () => ({
      accept: ['icon', 'app', 'folder'],
      drop(item: any, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset()
        const top = Math.round(item?.top + delta?.y)
        const left = Math.round(item?.left + delta?.x)
        console.log(item);
        move(item.type, item.name, left, top, item.data);
        return undefined
      },
    }),
    [move],
  );

  const openApplication = useCallback((name: string, data?: any) => {
    setApplications((prev: any) => {
      setIndex(index + 1);
      return {...prev, [name]: {...prev[name], index, isOpen: true, data}}
    })
  }, [setApplications, index, setIndex]);

  const closeApplication = useCallback((name: string) => {
    setApplications((prev: any) => {
      return {...prev, [name]: {...prev[name], isOpen: false}}
    })
  }, [setApplications]);

  const zoomApplication = (name: string) => {
    setApplications((prev: any) => {
      return {...prev, [name]: {...prev[name], isZoomed: !prev[name].isZoomed}};
    })
  }

  return (
    <main className={styles.main} ref={dropRef}>
      <CustomDragLayer applications={applications} />
      {
        Object.keys(icons).map((icon: any) => {
          return <Icon {...icons[icon]} key={icon} open={openApplication} />
        })
      }
      {
        Object.keys(applications).map((app: any) => {
          const {name, children} = applications[app];
          return <Application {...applications[app]} key={name} close={closeApplication} zoom={zoomApplication} children={children} />
        })
      }
    </main>
  )
}

export default Homescreen;
