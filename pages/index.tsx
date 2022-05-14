import type { NextPage } from 'next'
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDrop } from 'react-dnd'
import Folder from '../applications/folder/folder';
import Roadmap from '../applications/roadmap/roadmap';
import Team from '../applications/team/team';
import Application from '../components/application/application';
import { CustomDragLayer } from '../components/custom-drag-layer/custom-drag-layer';
import Icon from '../components/icon/icon';
import ScalableImage from '../components/scalable-image/scalable-image';
import {IApplications, IFolderItems, IIcons, stringify, TFolderItem} from '../utils/misc';

import styles from './index.module.css';
// image: 'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg'
const folderTest = {dog: {name: 'dog.png', children: <ScalableImage src={'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg'} alt={'dog'} />}, cat: {name: 'cat.png', children: <ScalableImage src={'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg'} alt={'cat'} />}};

const Homescreen: NextPage = () => {
  
  // z-index for applications
  const [index, setIndex] = useState<number>(0);

  const [icons, setIcons] = useState<IIcons>({
    "team": { top: 180, left: 20, name: "team", filename: "team.txt", image: "/text-icon.png", type: "icon"},
    "roadmap": { top: 20, left: 80, name: "roadmap", filename: "roadmap.txt", image: "/text-icon.png", type: "icon"},
    "folder": {top: 200, left: 200, name: "folder", filename: "folder n1", image: "/folder-icon.png", type: "icon"},
    "spiderweb": {top: 500, left: 300, name: "spiderweb", filename: "spiderweb.exe", image: "/cobweb.webp", type: "icon"},
  });

  const updateApplication = (application: string, field: string, updatedChildren: any) => {
    setApplications((prev: any) => {
      return {...prev, [application]: {...prev[application], [field]: updatedChildren }};
    })
  };
  
  const [applications, setApplications] = useState<IApplications>({
    team: {name: "team", applicationName: "team.txt", index: 1, width: 250, height: 250, top: 50, left: 50, isOpen: false, isZoomed: false, children: <Team />},
    roadmap: {name: "roadmap", applicationName: "roadmap.txt", index: 0, width: 250, height: 250, top: 50, left: 50, isOpen: false, isZoomed: false, children: <Roadmap />},
    folder: {name: "folder", applicationName: "folder n1", style: {'display': 'flex'}, index: 2, width: 250, height: 250, top: 50, left: 50, isOpen: false, isZoomed: false, children: <Folder field={''} items={folderTest} update={updateApplication} />},
    spiderweb: {name: "spiderweb", applicationName: "spiderweb.exe", index: 3, width: 250, height: 250, top: 50, left: 50, isOpen: false, isZoomed: false, children: <></>}
  })
  
  const move = useCallback((type: "app" | "icon", name: "team" | "roadmap", left: number, top: number, data?: any) => {
    if (type === 'icon') {
      const updated = {...icons, [name]: {...icons[name], left, top}};
      setIcons(updated);
      localStorage.setItem('icons', JSON.stringify(updated));
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

  
  // remember where each icon was left
  useEffect(() => {
    // uncomment if we need to update icons while in dev
    // localStorage.removeItem('icons');

    const loadedIcons = localStorage.getItem('icons');

    if (loadedIcons) setIcons(JSON.parse(loadedIcons));
    }, []);

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
