import React from 'react';
import ReactDOM from 'react-dom';
import ClaimCard from './../../components/ClaimCard'

import { shallow } from 'enzyme'

it('ClaimCard: displays', () => {
  const component = shallow(<ClaimCard />)
  expect(component.length).toBe(1)
})

it('ClaimCard: title text displays if provided', () => {
  const component = shallow(<ClaimCard title="tester" />)
  const title = component.find('.claim-card__title')

  expect(title.length).toBe(1)

  const titleText = component.find('.claim-card__title-text')
  expect(titleText.text()).toEqual("tester")
})

it('ClaimCard: status displays if provided', () => {
  const component = shallow(<ClaimCard title="test" status="unknown" />)
  const title = component.find('.claim-card__status--unknown')

  expect(title.length).toBe(1)
  expect(title.text()).toEqual("UNKNOWN")
})

it('ClaimCard: description displays properly', () => {
  const component = shallow(<ClaimCard description="This is the claim description" categories={[{id: "testing", name:"science"}]} />)
  const description = component.find('.claim-card__description')
  const descriptionText = component.find('.claim-card__description-text')
  const descriptionCategory = component.find('.claim-card__description-category')

  expect(description.length).toBe(1)

  expect(descriptionText.length).toBe(1)
  expect(descriptionText.text()).toEqual("This is the claim description")

  expect(descriptionCategory.length).toBe(1)
  expect(descriptionCategory.find('.fa-home').length).toBe(1)
})

it('ClaimCard: expert info shows', () => {
  const component = shallow(<ClaimCard experts_agree={2} experts_disagree={10} />)
  const agree = component.find('.claim-card__supporting__experts-agree')
  const disagree = component.find('.claim-card__supporting__experts-disagree')

  expect(agree.length).toBe(1)
  expect(agree.text()).toBe("2")

  expect(disagree.length).toBe(1)
  expect(disagree.text()).toBe("10")
})

it('ClaimCard: expert info fallback to 0 if not provided', () => {
  const component = shallow(<ClaimCard />)
  const agree = component.find('.claim-card__supporting__experts-agree')
  const disagree = component.find('.claim-card__supporting__experts-disagree')

  expect(agree.length).toBe(1)
  expect(agree.text()).toBe("N/A")

  expect(disagree.length).toBe(1)
  expect(disagree.text()).toBe("N/A")
})

it('ClaimCard: evidence info shows', () => {
  const component = shallow(<ClaimCard evidence_for={2} evidence_against={10} />)
  const evidence_for = component.find('.claim-card__supporting__evidence-for')
  const evidence_against = component.find('.claim-card__supporting__evidence-against')

  expect(evidence_for.length).toBe(1)
  expect(evidence_for.text()).toBe("2")

  expect(evidence_against.length).toBe(1)
  expect(evidence_against.text()).toBe("10")
})

it('ClaimCard: evidence info fallback to 0 if not provided', () => {
  const component = shallow(<ClaimCard />)
  const evidence_for = component.find('.claim-card__supporting__evidence-for')
  const evidence_against = component.find('.claim-card__supporting__evidence-against')

  expect(evidence_for.length).toBe(1)
  expect(evidence_for.text()).toBe("N/A")

  expect(evidence_against.length).toBe(1)
  expect(evidence_against.text()).toBe("N/A")
})

it('ClaimCard: votes info shows', () => {
  const component = shallow(<ClaimCard status={1} voteable_at={new Date()} votes_yes={3} votes_unsure={9} votes_no={123} />)
  const votes_yes = component.find('.claim-card__bottom__votes-yes')
  const votes_unsure = component.find('.claim-card__bottom__votes-unsure')
  const votes_no = component.find('.claim-card__bottom__votes-no')

  expect(votes_yes.length).toBe(1)
  expect(votes_yes.text()).toBe("3")

  expect(votes_unsure.length).toBe(1)
  expect(votes_unsure.text()).toBe("9")

  expect(votes_no.length).toBe(1)
  expect(votes_no.text()).toBe("123")
})

it('ClaimCard: votes info fallback to 0 if not provided', () => {
  const component = shallow(<ClaimCard status={1} voteable_at={new Date()} />)
  const votes_yes = component.find('.claim-card__bottom__votes-yes')
  const votes_unsure = component.find('.claim-card__bottom__votes-unsure')
  const votes_no = component.find('.claim-card__bottom__votes-no')

  expect(votes_yes.length).toBe(1)
  expect(votes_yes.text()).toBe("N/A")

  expect(votes_unsure.length).toBe(1)
  expect(votes_unsure.text()).toBe("N/A")

  expect(votes_no.length).toBe(1)
  expect(votes_no.text()).toBe("N/A")
})

it('ClaimCard: meta info shows', () => {
  const component = shallow(<ClaimCard bookmarks_count={4} comments_count={9} />)
  const bookmarks = component.find('.claim-card__bottom__meta-bookmarks')
  const comments = component.find('.claim-card__bottom__meta-comments')

  expect(bookmarks.length).toBe(1)
  expect(bookmarks.text()).toBe("4")

  expect(comments.length).toBe(1)
  expect(comments.text()).toBe("9")
})

it('ClaimCard: meta info fallback to 0 if not provided', () => {
  const component = shallow(<ClaimCard />)
  const bookmarks = component.find('.claim-card__bottom__meta-bookmarks')
  const comments = component.find('.claim-card__bottom__meta-comments')

  expect(bookmarks.length).toBe(1)
  expect(bookmarks.text()).toBe("N/A")

  expect(comments.length).toBe(1)
  expect(comments.text()).toBe("N/A")
})

it('ClaimCard: voting bottom shows upcoming vote info', () => {
  const component = shallow(<ClaimCard voteable_at={new Date("2018-02-05")} status={0} />)
  const vote_in = component.find(".claim-card__bottom__vote-in")
  expect(vote_in.length).toBe(1)

})

it('ClaimCard: voting bottom shows vote status if closed', () => {
  const component = shallow(<ClaimCard voteable_at={new Date("2017-01-01")} status={1} />)
  const vote_yes = component.find(".claim-card__bottom__votes-yes")
  expect(vote_yes.length).toBe(1)
})

it('ClaimCard: voting bottom shows vote link if voting is active', () => {
  const component = shallow(<ClaimCard voteable_at={new Date("2018-01-05")} status={0} />)
  const vote_now = component.find(".claim-card__bottom__vote-now")
  expect(vote_now.length).toBe(1)
})