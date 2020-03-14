import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/index'

import Community from '@/components/community'
import CommunityDetails from '@/components/community/details'
import SingleCommunity from '@/components/community/singleCommunity'
import Houseinglist from '@/components/community/houseinglist'
import PersonParticularList from '@/components/community/particularList/personParticularList'
import CarParticularList from '@/components/community/particularList/CarParticularList'
import PersonRecord from "@/components/community/personRecord"


import Information from '@/components/information'
import PerceptionList from '@/components/information/perception'


import Safety from '@/components/safety'
import person from "@/components/safety/person"
import car from "@/components/safety/car"
import bank from "@/components/safety/bank"
import policeRoom from "@/components/safety/policeRoom"




import BigData from '@/components/BigData'
import BigDataAnalysisList from "@/components/BigData/BigDataAnalysisList"






Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/community',
      name: 'Community',
      component: Community,
      redirect: "/community/communityDetails",
      children: [{
          path: 'communityDetails',
          name: 'CommunityDetails',
          component: CommunityDetails,
        },
        {
          path: 'singleCommunity',
          name: 'SingleCommunity',
          component: SingleCommunity,
        },
        {
          path: 'houseinglist',
          name: 'Houseinglist',
          component: Houseinglist,
        },
        {
          path: 'personParticularList',
          name: 'PersonParticularList',
          component: PersonParticularList,
          children:[
            {
              path: 'personRecord',
              name: 'PersonRecord',
              component: PersonRecord,
            },
          ]
        },
        {
          path: 'CarParticularList',
          name: 'CarParticularList',
          component: CarParticularList,
        }
      ]
    },
    {
      path: '/information',
      name: 'Information',
      component: Information,
      redirect: "/information/personPerceptionList",
      children: [
        {
        path: 'CarPerceptionList',
        name: 'CarPerceptionList',
        component: PerceptionList,
      },
      {
        path: 'personPerceptionList',
        name: 'PersonPerceptionList',
        component: PerceptionList,
      },
    ]
    },
    {
      path: '/safety',
      name: 'Safety',
      component: Safety,
      redirect:"/safety/person",
      children:[
        {
          path: 'person',
          name: 'person',
          component: person,
        },
        {
          path: 'car',
          name: 'car',
          component: car,
        },
        {
          path: 'bank',
          name: 'bank',
          component: bank,
        },
        {
          path: 'policeRoom',
          name: 'policeRoom',
          component: policeRoom,
        }
      ]
    },
    {
      path: '/BigData',
      name: 'BigData',
      component: BigData,
      redirect:"/BigData/bigDataAnalysisList",
      children:[
        {
          path: 'bigDataAnalysisList',
          name: 'BigDataAnalysisList',
          component: BigDataAnalysisList,
        }
      ]
    },
  ]
})
