require 'httparty'
require 'json'
class Api::V1::TicketController < ApplicationController
	
	protect_from_forgery
	include HTTParty
  before_action :load_user_defaults
	before_action :httparty_default_setting
	before_action :request_puts
	rescue_from StandardError, :with => :catch_error
	rescue_from BlogVault::Error, :with => :catch_custom_error

	def index
		verify_fields(params, [:page_no, :per_page]) 
		res = self.class.get("/tickets?order_by=updated_at&email=#{@@email}&per_page=#{params[:per_page]}&page=#{params[:page_no]}")
		validate_response(res)
		render json: res.body, status: res.code
  end

  def init_settings
    body = {
      :per_page => 10,
      :route => '/tickets'
    }
    render json: body, status: 200
  end


  def read
		verify_fields(params, [:id, :user_id])

		ticket_res = self.class.get("/tickets/#{params[:id]}")
		validate_response(ticket_res)
		ticket_res = JSON.parse(ticket_res.body)
		
		raise BlogVault::Error.new('Ticket Not Exist') if(ticket_res[:user_id] == params[:user_id])
		
		conversation_res = self.class.get("/tickets/#{params[:id]}/conversations")
		validate_response(conversation_res)
		conversation_res = JSON.parse(conversation_res.body)
		
		conversation_res = conversation_res.select{|conversation| conversation['private'] == false}
		ticket_res["conversationList"] = conversation_res
		render json: ticket_res, status: 200
  end

  def new
    ticket_fields_res = self.class.get("/ticket_fields")
    validate_response(ticket_fields_res)
    ticket_fields_res = JSON.parse(ticket_fields_res.body)
    ticket_fields_res = ticket_fields_res.select { |ticket_field| ticket_field["customers_can_edit"] == true }
    ticket_fields_res.each do |ticket_field|
      case ticket_field["type"]
    
      when "default_requester"
	ticket_field["type"] = "text"
	ticket_field["input_type"] = "text"

      when "default_subject"
	ticket_field["type"] = "text"
	ticket_field["input_type"] = "text"

      when "default_ticket_type"
	ticket_field["type"] = "select"

      when "default_source"
	ticket_field["type"] = "select"

      when "default_status"
	ticket_field["type"] = "select"
	ticket_field["choices"] = ticket_field["choices"].each_with_object({}) do |(key, value), choice|
	  choice[value.last] = key
	end

      when "default_priority"
	ticket_field["type"] = "select"

      when "default_group"
	ticket_field["type"] = "select"

      when "default_agent"
	ticket_field["type"] = "select"

      when "default_description"
	ticket_field["type"] = "textarea"

      when "default_company"
	ticket_field["type"] = "select"

      when "custom_text"
	ticket_field["type"] = "text"
	ticket_field["input_type"] = "text"
    
      when "custom_checkbox"
	ticket_field["type"] = "checkbox"

      when "custom_dropdown"
	ticket_field["type"] = "select"

      when "nested_field"
	ticket_field["type"] = "nested_dropdown"

      when "custom_date"
	ticket_field["type"] = "date"
	ticket_field["input_type"] = "date"

      when "custom_number"
	ticket_field["type"] = "number"
	ticket_field["input_type"] = "text"

      when "custom_decimal"
	ticket_field["type"] = "decimal"
	ticket_field["input_type"] = "text"

      else
	ticket_field["type"] = "textarea"
      end
    end
    render json: ticket_fields_res, status: 200
  end

  def create
		verify_fields(params, [:subject, :description])
		body = required_field(params,[:attachments, :subject, :description])
		body[:email] = @@email
		body[:priority] = 1
		body[:status] = 2
		body[:custom_fields] = {
			:cf_blog_uri => params["custom_fields"]["cf_blog_uri"]
		}	
		res = self.class.post('/tickets', {
			:body => body,
			:headers => {"Content-Type" => 'multipart/form-data'} }
		)
		validate_response(res)
		render json: res.body, status: res.code
  end

  def update
		verify_fields(params, [:id, :status])
		res = self.class.put("/tickets/#{params[:id]}",{:body => { status: params[:status]}.to_json(),:headers => {"Content-Type" => "application/json"}})
		validate_response(res)
		render json: res.body, status: res.code
  end

  def reply
		verify_fields(params, [:agent_id, :body, :id, :user_id])
		body = required_field(params, [:body, :user_id, :attachments])
		body[:private] = false
		if params[:agent_id] != "null"
			agent_res = self.class.get("/agents/#{params[:agent_id]}")
			validate_response(agent_res)
			agent_res = JSON.parse(agent_res.body)
			body[:notify_emails] =  [agent_res["contact"]["email"]]
		end
		res = self.class.post("/tickets/#{params[:id]}/notes",{
			:body => body,
			:headers => {"Content-Type" => 'multipart/form-data'} })
		validate_response(res)
		render json: res.body, status: res.code
	end
	
	def blog_uri_list
		blog_uri = [
			"https://google.com", 
			"https://facebook.com",
			"https://youtube.com",
			"https://twitter.com",
			"https://amazon.com",
			"https://blogvault.net"
		]
		body = {
			:blog_uri_list => blog_uri
		}
		render json: body, status: 200
	end

	private
	
	def httparty_default_setting
		api = "Basic #{Base64.strict_encode64("#{FRESHDESK_CONF["REACT_APP_FRESHDESK_API_KEY"]}:X")}"
		self.class.base_uri FRESHDESK_CONF["REACT_APP_FRESHDESK_BASE_URL"]
		self.class.headers :Authorization => api
	end

	def load_user_defaults
		@@email = 'something@enmail.com' 
	end

	def required_field(obj, labels_list)
		body = Hash.new
		labels_list.each do |label| 
			if obj.has_key?(label)
				body[label] = obj[label]
			end
		end
		body
	end

	def verify_fields(obj, args)
		puts 'Required Args: ',args
		args.each do |label|
		 raise BlogVault::Error.new('You have not send all required fields')	unless obj.has_key?(label)
		end
	end

	def validate_response(resp)
		if resp.code != 200 && resp.code != 201 
			p resp
			raise BlogVault::Error.new("Server Issue, Please Try Again...") 
		end
	end

	def catch_error(error)
		puts error
		render json: { message: error }, status: 400
	end

	def catch_custom_error(error)
		puts error
		render json: { message: error }, status: 400
	end

	def request_puts
		puts 'Params : ',params
	end

end
#{"description":"Validation failed","errors":[{"field":"priorty","message":"Unexpected/invalid field in request","code":"invalid_field"}]}
