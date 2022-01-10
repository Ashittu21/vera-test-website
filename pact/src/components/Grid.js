import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Waypoint } from "react-waypoint";
import { useSpring, animated } from "react-spring"
import Share from "./Share.js";

export default ({ items, currentSlug, hideShare=false }) => {
  return (
    <section className="Grid">
      {!hideShare && <Share />}
      <ul className="Grid-list bg--black">
        {items.map(item => (
          <Item
            key={item.id}
            item={item}
            currentSlug={currentSlug} />
        ))}
      </ul>
    </section>
  )
}

const Item = ({ item, currentSlug }) => {
  const [gridIn,setGridIn] = useState(false)
  const [gridStyle,setGridStyle] = useSpring(() => ({
    from: {
      opacity: 0
    },
    config: {
      tension: 50
    }
  }))
  setGridStyle({
    opacity: gridIn ? 1 : 0
  })

  return (
    <Waypoint
      onEnter={() => {
        setGridIn(true)
      }}
      onLeave={() => {
        setGridIn(false)
      }}>
      <animated.div
        style={{
          backgroundImage: `url(${item.image})`,
          ...gridStyle
        }}
        className={`
          Grid-item
          Grid-item--${item.type}
          ff-sans--bold
          ${item.slug === currentSlug ? 'Grid-item--currentExhibit' : ''}
          ${item.colorCombo && `color-combo--${item.colorCombo}`}
        `}
        key={item.id}>
          {item.type === "fillTile"
          ? <div className="Grid-item-inner color--white size--body">{item.text}</div>
          : <NavLink
            className="Grid-item-inner color--red"
            to={`/${item.slug}`}>
            <div className="text-align--center">
              <div className="stroke-text--thin size--headerxl">{item.title}</div>
              <div className="size--body">{item.subtitle}</div>
            </div>
          </NavLink>}
      </animated.div>
    </Waypoint>
  )
}
