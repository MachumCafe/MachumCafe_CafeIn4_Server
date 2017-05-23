var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Cafe = require('../../model/cafe')

// 현위치 1km 내 카페 전체목록
router.post('/', function(req, res) {
  Cafe.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [req.body.longitude, req.body.latitude]
        },
        // $near: [req.body.longitude, req.body.latitude],
        $maxDistance: 1000
      }
      // $geoWithin: {
      //   $centerSphere: [[req.body.longitude, req.body.latitude], 1 / 6378.1]
      // }
    }
  }).exec(function(err, cafe) {
    console.log(cafe.length)
    res.json(cafe)
  })
})

// 특정 카페 정보 불러오기
router.get('/:id', function(req, res) {
  var id = req.params.id

  Cafe.findById(id, function(err, cafe) {
    res.json(cafe)
  })
})

// 카페 리뷰 등록
router.put('/:id/review', function(req, res) {
  var id = req.params.id
  if(!req.user) {
    res.json({ result: 0, description: '세션정보 없음!' })
  } else {
    Cafe.findById(id, function(err, cafe) {
      req.body.review.date = new Date().toISOString().slice(0,10)
      cafe.review.push(req.body.review)
      cafe.save(function(err) {
        if(err) res.json(err)
        res.json({ result: 1, description: '리뷰 등록!', reviews: cafe.review })
      })
    })
  }
})

// 카페 리뷰 목록 불러오기
router.get('/:id/review', function(req, res) {
  var id = req.params.id
  Cafe.findById(id, function(err, cafe) {
    res.json({ result: 1, description: '성공!', reviews: cafe.review })
  })
})

module.exports = router
